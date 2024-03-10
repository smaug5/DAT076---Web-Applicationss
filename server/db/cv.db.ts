import { Schema, Model } from "mongoose";
import { CV } from "../src/model/cv";
import { conn } from "./conn";

const cvSchema : Schema = new Schema({
    serialPdf : {
        type : String,
        required : true,
        unique : false
    }
});