import express from "express";
import { cvRouter } from "./router/cvRouter";

export const app = express();

app.use(express.json());
app.use("./cvRouter", cvRouter);

