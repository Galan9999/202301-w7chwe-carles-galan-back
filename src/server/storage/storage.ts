import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const fileNamePrefix = uuidv4;

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/");
  },
  filename(req, file, callback) {
    callback(null, `${fileNamePrefix()}-${file.originalname}`);
  },
});

export default storage;
