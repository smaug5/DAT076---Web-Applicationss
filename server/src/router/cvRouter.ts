// This will handle incoming requests from the browser, which has to do with CVs.

import express, {Express, Request, Response } from "express";
import { CVServices, cvService } from "../service/cvServices";
import { CV } from "../model/cv";
import { app } from "../start";
import e from "express";


export const cvRouter = express.Router();


cvRouter.get("/", async (
    req: Request,
    res: Response<File | String>
) => {
    try {
        const tasks = await cvService.getCV(); 
        res.status(200).send(tasks);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


cvRouter.put('', async (
    req: Request<File | String>, 
    res: Response
    ) => {
    // Extract data from request body
    const id = parseInt(req.params.id);
    const cvData = req.body;

    if (!req.body) {
        return res.status(400).send({ message: 'Please upload a file.' });
      }
  
    try {
        const cv: CV = {
            id: parseInt(req.body.id), // Ensure proper type conversion
            file: req.body // Multer populates this ??? Possibly replace with other file handler
          };


        const updatedCV = await cvService.addCV(id, cvData);
      
        res.status(200).send({ message: 'CV updated successfully', cv });
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