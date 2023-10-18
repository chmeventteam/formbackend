import express from 'express';
import { connect } from 'mongoose';
import pkg from 'body-parser';
const { json } = pkg;
import cors from 'cors';
import {v2 as cloudinary} from 'cloudinary';
import multer from 'multer';
// import formData from 'express-form-data';

const app = express();
app.use(cors())
// app.use(formData.parse());
const port = process.env.PORT || 5000;

// MongoDB connection
connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(json());


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Upload image to Cloudinary
  cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
    if (error) {
      console.error('Error uploading to Cloudinary:', error);
      return res.status(500).json({ message: 'An error occurred while uploading' });
    }

    return res.json({ imageUrl: result.secure_url });
  }).end(req.file.buffer);
});

// Routes
import formRoutes from './routes/formRoutes.js';
app.use('/api/forms', formRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
