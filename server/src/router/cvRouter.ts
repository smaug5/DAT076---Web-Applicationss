// This will handle incoming requests from the browser, which has to do with CVs.

import express, {Express, Request, Response } from "express";
import { CVServices, cvService } from "../service/cvServices";
import { CV } from "../model/cv";
import { app } from "../start";
import e from "express";
import {uri} from "../../db/conn";
import * as fs from 'fs';
import { Readable } from "stream";


export const cvRouter = express.Router();

mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database at CV router.");
  })
  .catch((e: any) => console.log(e));


let connection = mongoose.connection;


const multer = require('multer');

const Grid = require("gridfs-stream");
const config = require("config");

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


connection.on("open", ()=> {
  console.log("connection established successfully")
  let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db)

  const  storage =  multer.memoryStorage()
const upload  =   multer({storage})

  app.post("/upload",upload.single("file"), async (req, res)=> {
      let {file} =  req
      console.log(file)

      let {fieldname, originalname, mimetype, buffer} = file

      let newFile = new File({
            filename: file.originalname,
            contentType: mimetype,
            length: buffer.length,
      })


      try{
          let uploadStream = bucket.openUploadStream(fieldname)
          let readBuffer = new Readable()
          readBuffer.push(buffer)
          readBuffer.push(null)
  
  
          const isUploaded = await new Promise((resolve, reject)=>{
              readBuffer.pipe(uploadStream)
              .on("finish", resolve("successfull"))
              .on("error" , reject("error occured while creating stream") )
          })
  
          
          newFile.id = uploadStream.id
         let savedFile =  await newFile.save()
         if(!savedFile){
          return res.status(404).send("error occured while saving our work")
         }
         return res.send({file: savedFile, message: "file uploaded successfully"})
      }
      catch(err){
res.send("error uploading file")
      }

  
  })

  app.get("/image/:fileId", (req, res)=>{
      let {fileId} = req.params

      let downloadStream = bucket.openDownloadStream( new mongoose.Types.ObjectId(fileId))

      downloadStream.on("file", (file:any)=>{
          res.set("Content-Type", file.contentType)
      })

      downloadStream.pipe(res)
  })
})

/* Latest
cvRouter.put("/", upload.single("cv"), async (req, res) => {
  console.log('req.file: ', req.file);
  const file = req.file;
  try {
    await cvSchema.deleteMany({});
    await cvSchema.create({ pdf: file });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
}); */
/* 
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
}); */

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

/*  Latest
app.get("/api/cv", async (req, res) => {
  try {
    cvSchema.find({}).then((data: any) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
}); */



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