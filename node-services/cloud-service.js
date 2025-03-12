import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { BlobServiceClient } from "@azure/storage-blob";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { randomUUID } from "crypto";

// AWS S3 Configuration
const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "your-access-key",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "your-secret-key"
  }
});

// Azure Blob Storage Configuration
const azureBlobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING || "your-connection-string"
);

// Container names
const S3_BUCKET_NAME = "content-genius-assets";
const AZURE_CONTAINER_NAME = "content-genius-assets";

/**
 * Upload a file to AWS S3
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {string} fileName - The name of the file
 * @param {string} contentType - The content type of the file
 * @returns {Promise<string>} - The URL of the uploaded file
 */
// async function uploadToS3(fileBuffer, fileName, contentType) {
//   try {
//     const key = `${randomUUID()}-${fileName}`;
    
//     const command = new PutObjectCommand({
//       Bucket: S3_BUCKET_NAME,
//       Key: key,
//       Body: fileBuffer,
//       ContentType: contentType
//     });
    
//     await s3Client.send(command);
    
//     console.log(`File uploaded successfully to S3: ${key}`);
//     return `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
//   } catch (error) {
//     console.error("Error uploading to S3:", error);
//     throw error;
//   }
// }

// Mock S3 upload for local development
async function uploadToS3(fileBuffer, fileName, contentType) {
  try {
    const key = `${randomUUID()}-${fileName}`;
    
    // Save to local file system instead of S3
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const localPath = path.join(process.cwd(), 'uploads', key);
    
    // Create uploads directory if it doesn't exist
    await fs.mkdir(path.join(process.cwd(), 'uploads'), { recursive: true });
    
    // Write file
    await fs.writeFile(localPath, fileBuffer);
    
    console.log(`File saved locally: ${localPath}`);
    return `http://localhost:5001/uploads/${key}`;
  } catch (error) {
    console.error("Error in mock S3 upload:", error);
    throw error;
  }
}

/**
 * Download a file from AWS S3
 * @param {string} key - The key of the file in S3
 * @param {string} outputPath - The path to save the file
 * @returns {Promise<string>} - The path of the downloaded file
 */
async function downloadFromS3(key, outputPath) {
  try {
    const command = new GetObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key
    });
    
    const response = await s3Client.send(command);
    
    const writeStream = createWriteStream(outputPath);
    await pipeline(response.Body, writeStream);
    
    console.log(`File downloaded successfully from S3: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error("Error downloading from S3:", error);
    throw error;
  }
}

/**
 * Upload a file to Azure Blob Storage
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {string} fileName - The name of the file
 * @param {string} contentType - The content type of the file
 * @returns {Promise<string>} - The URL of the uploaded file
 */
async function uploadToAzure(fileBuffer, fileName, contentType) {
  try {
    const containerClient = azureBlobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);
    
    // Create the container if it doesn't exist
    await containerClient.createIfNotExists();
    
    const blobName = `${randomUUID()}-${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
    await blockBlobClient.upload(fileBuffer, fileBuffer.length, {
      blobHTTPHeaders: {
        blobContentType: contentType
      }
    });
    
    console.log(`File uploaded successfully to Azure: ${blobName}`);
    return blockBlobClient.url;
  } catch (error) {
    console.error("Error uploading to Azure:", error);
    throw error;
  }
}

/**
 * Download a file from Azure Blob Storage
 * @param {string} blobName - The name of the blob in Azure
 * @param {string} outputPath - The path to save the file
 * @returns {Promise<string>} - The path of the downloaded file
 */
async function downloadFromAzure(blobName, outputPath) {
  try {
    const containerClient = azureBlobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
    await blockBlobClient.downloadToFile(outputPath);
    
    console.log(`File downloaded successfully from Azure: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error("Error downloading from Azure:", error);
    throw error;
  }
}

/**
 * Multi-cloud upload - uploads to both AWS and Azure
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {string} fileName - The name of the file
 * @param {string} contentType - The content type of the file
 * @returns {Promise<{awsUrl: string, azureUrl: string}>} - The URLs of the uploaded files
 */
async function multiCloudUpload(fileBuffer, fileName, contentType) {
  try {
    // Upload to both clouds in parallel
    const [awsUrl, azureUrl] = await Promise.all([
      uploadToS3(fileBuffer, fileName, contentType),
      uploadToAzure(fileBuffer, fileName, contentType)
    ]);
    
    return { awsUrl, azureUrl };
  } catch (error) {
    console.error("Error in multi-cloud upload:", error);
    throw error;
  }
}

// Example usage
async function testCloudServices() {
  try {
    // Create a sample file buffer
    const sampleText = "This is a test file for cloud storage integration.";
    const fileBuffer = Buffer.from(sampleText);
    
    console.log("Starting multi-cloud upload test...");
    
    const { awsUrl, azureUrl } = await multiCloudUpload(
      fileBuffer,
      "test-file.txt",
      "text/plain"
    );
    
    console.log("Multi-cloud upload successful!");
    console.log("AWS URL:", awsUrl);
    console.log("Azure URL:", azureUrl);
    
    // Extract the key and blob name from the URLs
    const s3Key = awsUrl.split("/").pop();
    const blobName = azureUrl.split("/").pop();
    
    // Download the files (in a real application, you would use these functions separately)
    // await downloadFromS3(s3Key, "./downloaded-from-s3.txt");
    // await downloadFromAzure(blobName, "./downloaded-from-azure.txt");
    
    return { awsUrl, azureUrl };
  } catch (error) {
    console.error("Test failed:", error);
  }
}

// Run the test
testCloudServices();

// Export the functions for use in other modules
export {
  uploadToS3,
  downloadFromS3,
  uploadToAzure,
  downloadFromAzure,
  multiCloudUpload
};