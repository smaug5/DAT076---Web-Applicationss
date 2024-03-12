import {Schema, Model} from "mongoose";
import {Auth} from "../model/auth"
import {conn} from "../model/conn"

const mongoose = require('mongoose');

const authSchema: Schema = new mongoose.Schema({ 
    password: {
        type: String,
        required: true,
        unique: false
        }
    },
);

export const cvModel = conn.model<Auth>("password", authSchema);