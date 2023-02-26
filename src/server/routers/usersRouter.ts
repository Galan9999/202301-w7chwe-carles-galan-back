import { Router } from "express";
import { loginUser, registerUser } from "../controllers/usersControllers.js";
import multer from "multer";
import storage from "../storage/storage.js";

const usersRouter = Router();
const upload = multer({ storage });

usersRouter.post("/register", upload.single("image"), registerUser);
usersRouter.post("/login", loginUser);

export default usersRouter;
