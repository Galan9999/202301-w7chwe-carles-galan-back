import "./loadEnvironment.jss";
import mongoose from "mongoose";
import chalk from "chalk";
import createDebug from "debug";
import connectDataBase from "./database/connectDataBase.js";
import startServer from "./server/startServer.js";

export const debug = createDebug("socialNetwork:");

const port = process.env.PORT ?? 4000;
const mongoDbUrl = process.env.MONGODB_CONNECTION_URL;

mongoose.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

try {
  await connectDataBase(mongoDbUrl!);
  debug(chalk.green("Connected to database"));

  await startServer(+port);
  debug(chalk.blue(`Server listening on ${port}`));
} catch (error) {
  debug(error.message);
}
