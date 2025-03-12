import express from 'express';
import cors from 'cors';
import { uploadToS3, uploadToAzure, multiCloudUpload } from './cloud-service.js';
import dotenv from 'dotenv';
import multer from 'multer';

// Load environment variables
dotenv.config();

const app = express();
const port = 5001;

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Cloud Services API is running');
});

// Upload to AWS S3
app.post('/api/upload/aws', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const contentType = req.file.mimetype;

    const url = await uploadToS3(fileBuffer, fileName, contentType);
    
    res.json({ url });
  } catch (error) {
    console.error('Error uploading to AWS:', error);
    res.status(500).json({ error: 'Failed to upload file to AWS' });
  }
});

// Upload to Azure Blob Storage
app.post('/api/upload/azure', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const contentType = req.file.mimetype;

    const url = await uploadToAzure(fileBuffer, fileName, contentType);
    
    res.json({ url });
  } catch (error) {
    console.error('Error uploading to Azure:', error);
    res.status(500).json({ error: 'Failed to upload file to Azure' });
  }
});

// Multi-cloud upload
app.post('/api/upload/multi', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const contentType = req.file.mimetype;

    const urls = await multiCloudUpload(fileBuffer, fileName, contentType);
    
    res.json(urls);
  } catch (error) {
    console.error('Error in multi-cloud upload:', error);
    res.status(500).json({ error: 'Failed to upload file to multiple clouds' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Cloud Services API running at http://localhost:${port}`);
});