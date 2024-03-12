// This will handle incoming requests from the browser, which has to do with CVs.

import express, {Express, Request, Response } from "express";
import { app } from "../start";
import e from "express";
import * as fs from 'fs';
import stream, { Readable } from "stream";
import { CV } from "../model/cv";
import multer from "multer";
import {cvService, cvServices} from "../service/cvService";


require("../model/cv.db");
export const cvRouter = express.Router();


/*
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "./files");
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});*/
//const upload = multer({ storage: storage });


/* mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database at CV router.");
  })
  .catch((e: any) => console.log(e));


let connection = mongoose.connection; */


// Multer storage configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET Endpoint for retrieving the CV image
cvRouter.get("/", async (
    req: Request,
    res: Response<CV>
) => {
    try {
      // Sending request to the service to retrieve the CV
        const cvImage: CV = await cvServices.getCV();

        // Converting to data URL
        cvImage.image = `data:image/png;base64,${cvImage.image}`;
        
        //console.log("CV image from the database:" + cvImage.image);
    
        // Sending the CV image as response
        res.status(200).send(cvImage);
    } catch (e: any) {
      // Sends an error message containing the message which was thrown
        console.log("Error retrieving CV: " + e.message);
        res.status(500).send(e.message);
    }
});


// PUT Endpoint to update the CV file
cvRouter.put('/', upload.single('image'), async (req, res) => {
try {
    //console.log(req.body);
    console.log("Entered put route")

    // Extract the image data from the request body and handle file upload
    const { image } = req.body;
    let imageData: String;

    if (req.file) {
      imageData = req.file.buffer.toString('base64');
    }
    else {
      throw new Error('No file uploaded.');
    }

    // Create a new CV object with the updated image
    const newCV: CV = {
      image: imageData
    };

    // Replaces the existing CV with the new data
    await cvServices.replaceCV(newCV);
    
    // Sending success response
    res.status(201).json({ message: 'CV added successfully', id: imageData });
} catch (error) {
    console.error('Error submitting CV:', error);
    res.status(500).json({ message: 'Failed to add CV' });
}
});

//------------------------------------- Attempt 6 -------------------------------------
/*
const multer = require('multer');
const CV = require('./models/cv.db');

const Grid = require("gridfs-stream");
const config = require("config");

const File = require("./models/file2");
const cvSchema = mongoose.model('cv');
connection.on("open", () => {
  console.log("connection established successfully");
  let bucket = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: 'cvFiles'
  });

  const storage = multer.memoryStorage();
  const upload = multer({ storage });

  cvRouter.put("/upload", upload.single("file"), async (req, res) => {
    let { file } = req;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    console.log("Entered upload route")

    console.log(file);

    let { originalname, mimetype, buffer } = file;

    try {
      const uploadStream = bucket.openUploadStream(originalname, {
        contentType: mimetype
      });

      const readStream = new stream.Readable();
      readStream.push(buffer);
      readStream.push(null);
      readStream.pipe(uploadStream);

      const isUploaded = new Promise((resolve, reject) => {
        uploadStream.on('finish', () => resolve(uploadStream.id.toString()));
        uploadStream.on('error', reject);
      });

      const fileId = await isUploaded;
      let newCV = new CV({
        pdf: fileId // Storing the file ID from GridFS, not the file name
      });

      let savedCV = await newCV.save();
      if (!savedCV) {
        return res.status(500).send("Error occurred while saving the file metadata");
      }
      return res.send({ file: savedCV, message: "File uploaded successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error uploading file");
    }
  });

  // Ensure your GET endpoint and other logic are correctly using the bucket as well
  cvRouter.get("/image", async (req, res) => {
    try {
      // Assuming there's only one CV document in the collection
      const cv = await CV.findOne();
      if (!cv || !cv.pdf) {
        return res.status(404).send('No PDF found.');
      }
  
      const fileId = cv.pdf; // Retrieve the fileId stored in the CV document
      let downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
  
      downloadStream.on("file", (file:any) => {
        res.set("Content-Type", file.contentType);
      });
  
      downloadStream.on("error", (error:any) => {
        res.status(404).send("PDF not found");
      });
  
      downloadStream.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving PDF");
    }
  });
  
});
*/
//------------------------------------- End Attempt 6 -------------------------------------




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