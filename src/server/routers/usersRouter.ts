import { Router } from "express";
import {
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/usersControllers/usersControllers.js";
import multer from "multer";
import storage from "../storage/storage.js";

const usersRouter = Router();
const upload = multer({ storage });

usersRouter.post("/register", upload.single("image"), registerUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/", getUsers);

export default usersRouter;
