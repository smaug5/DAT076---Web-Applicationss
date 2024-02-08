// This will handle incoming requests from the browser, which has to do with CVs.

import express, { Request, Response } from "express";
import { CVServices } from "../service/cvServices";

export const cvRouter = express.Router();


cvRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<File | String>
) => {
    try {
        const tasks = await CVServices.getCV(); 
        res.status(200).send(tasks);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

cvRouter.put('/api/:company', function (req, res) {
    var company = req.company;
    company = _.extend(company, req.body);
    company.save(function(err) {
    if (err) {
        return res.send('/company', {
            errors: err.errors,
            company: company
        });
    } else {
        res.jsonp(company);
    }   
  })
});