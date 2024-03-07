import express, { Request, Response } from "express";
import { adminwaplogin } from "../service/adminService";
import { Session } from "inspector";
import { IAdminService } from "../service/admin.interface";

export const adminRouter = express.Router();
//add in start.ts

//const adminService : IAdminService = new AdminService(); 

interface LoginRequest extends Request {
    status: any;        //should be something else i believe
    params : {},
    session: any,
    body : { password : string }
}

adminRouter.post("/login", async (req: LoginRequest, res) => {
    try {
        if (typeof(req.body.password) !== "string" || req.body.password === "") {
            req.status(400).send("Invalid password")
        }

        if (! await adminService.find(req.body.password)) {
            res.status(401).send("Password not found");
        }

        req.session.user = req.body.password;
    } catch (e : any) {
        res.status(500).send(e.message);
    }
});
