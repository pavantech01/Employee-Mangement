const fs = require('fs');
const multer = require('multer');
const path = require('path');

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
// Ensure the uploads directory exists
const ensureUploadsDirExists = () => {
    // const dir = '/uploads';
    const dir = path.join(__dirname, 'uploads'); 
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });  // Create directory if it doesn't exist
        console.log('Uploads directory created');
    }
};



// Set up Multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));  // Correctly append the extension
//     }
// });
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         ensureUploadsDirExists();  // Ensure the directory exists before saving the file
//         cb(null, path.join(__dirname, 'uploads/'));
//         // cb(null, 'uploads/');  // Now safe to use this directory
//         // cb(null, "/assets");  // Now safe to use this directory

//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix= Date.now();
//         cb(null, uniqueSuffix+" - "+file.originalname);
//     }
// });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        ensureUploadsDirExists();  // Ensure the directory exists before saving the file
        cb(null, path.join(__dirname, 'uploads/')); // Ensure the path is correct
    },
    filename: function (req, file, cb) {
        const hyphenatedName = file.originalname.replace(/\s/g, '-');
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + " - " + hyphenatedName);
        console.log(`File uploaded: ${hyphenatedName}`); 

    }
});


const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {  
        return cb(null, true);
    } else {
        cb('Error: Images supported jpeg, jpg or png Only!');
        console.log("Error: Images supported jpeg, jpg or png Only!")
    }
};

// const upload = multer({ 
//     storage: storage });

// module.exports = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: { fileSize: 1024 * 1024 * 10 } // 10MB file size limit
// });

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 10 }  // 10MB file size limit
});

module.exports = upload;