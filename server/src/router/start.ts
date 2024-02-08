import express from "express";
import { cvRouter } from "./cvRouter";

export const app = express();

app.use(express.json());
app.use("./cvRouter", cvRouter);

