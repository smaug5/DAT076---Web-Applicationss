import express, { Request, Router } from "express";
import { adminService, adminwaplogin } from "../service/adminService";
import { Session } from "inspector";
import { IAdminService } from "../service/admin.interface";
import { login } from "../model/login";

export const adminRouter : Router = express.Router();
//add in start.ts

const admService = new adminService(); 

interface LoginRequest extends Request {
    params : {},
    session: any,
    body : { password : string }
}

adminRouter.post("/login", async (
    req: LoginRequest, 
    res
    ) => {
    try {
        if (typeof(req.body.password) !== "string" || req.body.password === "") {
            req.status(400).send("Invalid password")
        }

        if (! await admService.verifyPassword(req.body.password)) {
            res.status(401).send("Password not found");
        }

        req.session.user = req.body.password;
    } catch (e : any) {
        res.status(500).send(e.message);
    }
});
