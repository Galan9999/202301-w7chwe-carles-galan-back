import { Response, Request, NextFunction } from "express";
import { CustomError } from "../../CustomError/CustomError";
import { generalError, notFoundError } from "./errorMiddlewares";

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;
const req = {} as Request;
const next = jest.fn() as NextFunction;

beforeEach(() => jest.clearAllMocks());

describe("Given the notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call its next method", () => {
      notFoundError(req, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives an Error with status 500", () => {
    test("Then is should cal its status method with a 500", () => {
      const statusCode = 500;
      const error = new CustomError(
        "There is an error",
        500,
        "Something went wrong"
      );

      generalError(error, req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });
});
