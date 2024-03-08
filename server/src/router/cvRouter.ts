// This will handle incoming requests from the browser, which has to do with CVs.

import express, {Express, Request, Response } from "express";
import { CVServices, cvService } from "../service/cvServices";
import { CV } from "../model/cv";
import { app } from "../start";
import e from "express";
import {uri} from "../../db/conn";
import * as fs from 'fs';


export const cvRouter = express.Router();

mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database at CV router.");
  })
  .catch((e: any) => console.log(e));

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "./files");
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
require("../model/cv.db");
const cvSchema = mongoose.model('cv');
const upload = multer({ storage: storage });


cvRouter.put('/', upload.single('cv'), async (
  req: Request, 
  res: Response
) => { 
    console.log('req.file: ', req.file);
    const file = req.file;
    try{
      cvSchema.deleteMany({});
      cvSchema.create({pdf: file});

      res.send({ status: "ok" });
    } catch (error){
      res.json({ status: error });
    }
});

/*
cvRouter.get("/", async (
    req: Request,
    res: Response
) => {
  try {
    const cv = await cvService.getCV();
    if (!cv) {
      return res.status(404).send('No CV found.');
    }

    res.type(cv.contentType);
    res.header('Content-Disposition', `attachment; filename="${cv.fileName}"`);
    res.send(cv.data);
  } catch (error) {
    console.error('Error retrieving CV:', error);
    res.status(500).send('Error retrieving CV');
  }
});*/

app.get("/api/cv", async (req, res) => {
  try {
    const cv = await cvSchema.findOne();
    if (!cv || !cv.pdf) {
      return res.status(404).send('No CV found');
    }

    const filePath = `./files/${cv.pdf}`;
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('File not found');
    }

    res.setHeader('Content-Disposition', 'inline; filename="' + encodeURIComponent(cv.pdf) + '"');
    res.type('application/pdf');
    res.sendFile(filePath, { root: '.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});



/* 
cvRouter.put('/', upload.single('cv'), async (
      req: Request, 
      res: Response
  ) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Convert buffer to binary object 
    const cvData : CV = {
      contentType: req.file.mimetype,
      data: Buffer.from(req.file.buffer),
      fileName: req.file.originalname,
    };

    const CV = await cvService.replaceCV(cvData);

    res.status(200).json({ message: 'CV uploaded successfully', data: CV });
  } catch (error) {
    console.error('Error uploading CV:', error);
    res.status(500).send('Error uploading CV');
  }
}); */




// cvRouter.put('/api/:company', function (req, res) {
//     var company = req.company;
//     company = _.extend(company, req.body);
//     company.save(function(err) {🎆
//     if (err) {😀 👻😀 😀 😀 😀 😀 😀 ⚫💢🐱‍👓🐱‍🚀🐱‍🐉- HACKERCAT🐱‍💻 
//         return res.send('/company', {
//             errors: err.errors,
//             company: company
//         });
//     } else {
//         res.jsonp(company);
//     }   
//   })
// });