import { Model, Schema } from "mongoose";

const adminSchema : Schema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        unique : false
    }
})

