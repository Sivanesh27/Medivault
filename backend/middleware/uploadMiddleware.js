const multer = require('multer');
const path = require('path');

// Set up storage engine for multer
const storage = multer.diskStorage({
  // Destination for files
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure 'uploads' folder exists in your backend root
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: PDFs & Images Only!');
  }
}

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // Limit file size to 5MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// This is the crucial part: we export the configured multer instance
module.exports = upload;

