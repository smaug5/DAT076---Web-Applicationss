import express, {Express, Request, Response } from "express";
import { app } from "../start";
import e from "express";
import * as fs from 'fs';
import stream, { Readable } from "stream";
import { socialMedia } from "../model/socialMedia";
import multer from "multer";
import {socialMediaService, socialMediaServices} from "../service/socialMediaServices";


require("../model/socialMedia.db");

export const socialMediaRouter = express.Router();

socialMediaRouter.get("/", async (
    req: Request,
    res: Response<socialMedia>
) => {
    try {
        const socialMedia: socialMedia = await socialMediaServices.getSocialMedia();
        console.log("Social media from the database:" + socialMedia);
        res.status(200).send(socialMedia);
    } catch (e:any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});


socialMediaRouter.post("/", async (
    req: Request,
    res: Response
) => {
    console.log("In post: Updating social media links")
    try {
        // Extract social media links from request body
        console.log("In the body wow")
        const { facebook, instagram, linkedin, twitter} = req.body;

        console.log("Social media links are: " + facebook + " " + instagram + " " + linkedin + " " + twitter)

        // Update social media links in the database
        await socialMediaServices.updateSocialMedia(facebook, instagram, linkedin, twitter);

        res.status(200).send("Social media links changed successfully!");
    } catch (e:any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});