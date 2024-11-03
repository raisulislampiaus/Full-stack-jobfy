const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer storage to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'company_docs', // Optional folder name in Cloudinary
    resource_type: 'raw', // Allows raw file types, like PDFs and docs
    allowed_formats: ['pdf', 'docx'],
     // Allow both PDF and DOCX file formats
  },
});

const upload = multer({ storage });

module.exports = upload;
