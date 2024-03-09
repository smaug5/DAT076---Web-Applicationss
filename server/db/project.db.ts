import { Schema, Model } from "mongoose";
import { project } from "../src/model/project";
import { conn } from "./conn";

const projectSchema : Schema = new Schema( {
    title : {
        type : String,
        required : true,
        unique : true
    },
    
    description : {
        type : String,
        required : true,
        unique : false
    },
    
    image : {
        type : String,
        required : false,
        unique : false
    },

    url : {
        type : String,
        required : false,
        unique : false
    }

});

export const projectModel = conn.model<project>("Project", projectSchema);