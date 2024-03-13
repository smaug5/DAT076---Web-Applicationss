import {Schema, Model} from "mongoose";
import {socialMedia} from "../model/socialMedia"
import {conn} from "../model/conn"

const mongoose = require('mongoose');

const socialMediaSchema: Schema = new mongoose.Schema({
    linkedin: {type: String, required: true},
    facebook: {type: String, required: true},
    instagram: {type: String, required: true},
    twitter: {type: String, required: true}
});

export const socialMediaModel = conn.model<socialMedia>("socialMedia", socialMediaSchema);