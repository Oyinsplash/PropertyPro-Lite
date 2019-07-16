import multer from "multer";
import store from "../helpers/cloudinary";

/* eslint camelcase: 0 */
export default class UploadImage {
  static upload(req, res, next) {
    const uploadMulter = multer({
      store,
      limits: { files: 1, fileSize: 900000 }
    }).single("images");
    uploadMulter(req, res, error => {
      if (error instanceof multer.MulterError) {
        return res.status(400).json({
          status: "400 Bad Request",
          error: "Image should not exceed 750kb"
        });
      }
      if (error)
      return res.status(400).json({
        status: '400 Bad Request',
        error: 'Invalid File Format'
      });
      if (!req.file)
      return res.status(400).json({
        status: '400 Bad Request',
        error: 'An Image is Required'
      });
      return next();
    });
  }
}
