const express = require('express');
const Contact = require('../models/Contact');
const multer = require('multer');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) =>
        cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post(
  '/',
  upload.array('files', 5), // allow up to 5 files, adjust as needed
  async (req, res) => {
    try {
      const { name, phone, email, subject, message } = req.body;
      const files = req.files ? req.files.map(f => f.filename) : [];
      const contact = new Contact({ name, phone, email, subject, message, files });
      await contact.save();
      res.status(201).json({ message: 'Contact form submitted!', contact });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
);

module.exports = router;
