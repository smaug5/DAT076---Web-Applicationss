import {Schema, Model} from "mongoose";
import {project} from "../model/project"
import {conn} from "../model/conn"

const mongoose = require('mongoose');

const projectSchema: Schema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: false},
    url: {type: String, required: true}
});

export const projectModel = conn.model<project>("project", projectSchema);