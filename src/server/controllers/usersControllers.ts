import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../database/User.js";
import { CustomError } from "../../CustomError/CustomError.js";
import { UserCredentials } from "../../types.js";

export const registerUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body;
  const saltLength = 8;

  try {
    const image = req.file?.filename;

    const hashedPassword = await bcrypt.hash(password, saltLength);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      image,
    });

    res.status(201).json({ user });
  } catch (error) {
    const newError = new CustomError(
      (error as Error).message,
      409,
      "Couldn't create user"
    );

    next(newError);
  }
};

export const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  const userToFind = username.toString();

  try {
    const user = await User.findOne({ username: userToFind }).exec();

    if (!user) {
      const error = new CustomError(
        "Wrong credentials",
        401,
        "Wrong credentials"
      );

      next(error);

      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const error = new CustomError(
        "Wrong credentials",
        401,
        "Wrong credentials"
      );

      next(error);

      return;
    }

    const jwtPayload = {
      sub: user?._id,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
