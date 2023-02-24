import cors from "cors";
import morgan from "morgan";
import express from "express";

export const app = express();

app.use(cors());
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());
