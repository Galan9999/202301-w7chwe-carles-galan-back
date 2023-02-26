import cors from "cors";
import morgan from "morgan";
import express from "express";
import usersRouter from "./routers/usersRouter.js";
import { generalError, notFoundError } from "./middlewares/errorMiddlewares.js";

export const app = express();

app.use(cors());
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);

app.use(notFoundError);
app.use(generalError);
