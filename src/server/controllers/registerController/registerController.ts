import { NextFunction, Request, Response } from "express";
import { UserCredentials } from "../../../types.js";
import bcrypt from "bcryptjs";
import User from "../../../database/User.js";
import { CustomError } from "../../../CustomError/CustomError.js";

const registerUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const salt = "gemma";
    const image = req.file?.filename;

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      image,
    });

    res.status(201).json({ user });
  } catch (error) {
    const newError = new CustomError(
      (error as Error).message,
      409,
      "Coudldn't create user"
    );

    next(newError);
  }
};

export default registerUser;
