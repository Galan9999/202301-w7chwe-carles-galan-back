import { NextFunction, Request, Response } from "express";
import createDebug from "debug";
import { CustomError } from "../../CustomError/CustomError.js";

export const debug = createDebug(
  "socialNetwork:server:middlewares:errorMiddlewares"
);

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError("Path not found", 404, "Endpoint not fund");

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(error.message);

  res
    .status(error.statusCode || 500)
    .json({ error: error.publicMessage || "Something went wrong" });
};
