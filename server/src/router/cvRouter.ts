// This will handle incoming requests from the browser, which has to do with CVs.

import express, {Express, Request, Response } from "express";
import { CVServices, cvService } from "../service/cvServices";
import { CV } from "../model/cv";
import { app } from "../start";
import e from "express";


export const cvRouter = express.Router();


cvRouter.get("/", async (
    req: Request,
    res: Response<CV | String>
) => {
    try {
        const cv = await cvService.getCV(); 
        res.status(200).send(cv);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


cvRouter.put('', async (
  req: Request<File | String>, 
  res: Response
  ) => {
  // Extract data from request body
  const cvData = req.body;

  if (!req.body) {
      return res.status(400).send({ message: 'Please upload a file.' }); //Possibly error 404
    }

  try {
      
      const updatedCV = await cvService.addCV(cvData);
    
      res.status(200).send({ message: 'CV updated successfully' });
  } catch (e: any) {
    res.status(500).send("Error uploading CV" + e.message);
  }
});


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