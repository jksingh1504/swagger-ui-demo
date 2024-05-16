import multer from "multer";

// Set up multer middleware to handle file uploads
const upload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

export default upload;
