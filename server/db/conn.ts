import { createConnection } from "mongoose";

const uri = "mongodb+srv://portfoliowap:<HackerCatNos>@portfolio.zyejove.mongodb.net/?retryWrites=true&w=majority&appName=Portfolio"

export const conn = createConnection(uri);