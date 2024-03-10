import {Schema, Model} from "mongoose";
import {CV} from "../model/cv"
import {conn} from "../model/conn"

const mongoose = require('mongoose');

const cvSchema: Schema = new mongoose.Schema({ 
    image: {
        type: String,
        required: true,
        unique: false
        }
    },

);

export const cvModel = conn.model<CV>("cv", cvSchema);