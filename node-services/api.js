import express from "express"
import cors from "cors"
import { randomUUID } from "crypto"
import multer from "multer"
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

// Get the directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure Express
const app = express()
const port = 5001

// Middleware
app.use(cors())
app.use(express.json())

// Configure multer for file uploads
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads")
fs.mkdir(uploadsDir, { recursive: true }).catch(console.error)

// Make uploads directory accessible
app.use("/uploads", express.static(uploadsDir))

// Mock AWS S3 upload
async function mockUploadToS3(fileBuffer, fileName, contentType) {
  try {
    const key = `${randomUUID()}-${fileName}`
    const localPath = path.join(uploadsDir, key)

    await fs.writeFile(localPath, fileBuffer)

    console.log(`File saved locally (mock S3): ${localPath}`)
    return `http://localhost:${port}/uploads/${key}`
  } catch (error) {
    console.error("Error in mock S3 upload:", error)
    throw error
  }
}

// Mock Azure Blob Storage upload
async function mockUploadToAzure(fileBuffer, fileName, contentType) {
  try {
    const blobName = `${randomUUID()}-${fileName}`
    const localPath = path.join(uploadsDir, blobName)

    await fs.writeFile(localPath, fileBuffer)

    console.log(`File saved locally (mock Azure): ${localPath}`)
    return `http://localhost:${port}/uploads/${blobName}`
  } catch (error) {
    console.error("Error in mock Azure upload:", error)
    throw error
  }
}

// Routes
app.get("/", (req, res) => {
  res.send("Cloud Services API is running")
})

// Upload to AWS S3 (mock)
app.post("/api/upload/aws", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    const fileBuffer = req.file.buffer
    const fileName = req.file.originalname
    const contentType = req.file.mimetype

    const url = await mockUploadToS3(fileBuffer, fileName, contentType)

    res.json({ url })
  } catch (error) {
    console.error("Error uploading to AWS:", error)
    res.status(500).json({ error: "Failed to upload file to AWS" })
  }
})

// Upload to Azure Blob Storage (mock)
app.post("/api/upload/azure", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    const fileBuffer = req.file.buffer
    const fileName = req.file.originalname
    const contentType = req.file.mimetype

    const url = await mockUploadToAzure(fileBuffer, fileName, contentType)

    res.json({ url })
  } catch (error) {
    console.error("Error uploading to Azure:", error)
    res.status(500).json({ error: "Failed to upload file to Azure" })
  }
})

// Multi-cloud upload (mock)
app.post("/api/upload/multi", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    const fileBuffer = req.file.buffer
    const fileName = req.file.originalname
    const contentType = req.file.mimetype

    // Upload to both mock services in parallel
    const [awsUrl, azureUrl] = await Promise.all([
      mockUploadToS3(fileBuffer, fileName, contentType),
      mockUploadToAzure(fileBuffer, fileName, contentType),
    ])

    res.json({ awsUrl, azureUrl })
  } catch (error) {
    console.error("Error in multi-cloud upload:", error)
    res.status(500).json({ error: "Failed to upload file to multiple clouds" })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Cloud Services API running at http://localhost:${port}`)
})

