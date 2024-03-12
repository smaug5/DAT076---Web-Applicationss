import express, { Request, Response } from "express";
import { adminwaplogin, adminService } from "../service/adminService";
import { Auth } from "../model/auth";

export const adminRouter = express.Router();

adminRouter.get("/", async (
    req: Request,
    res: Response<Boolean>
) => {
    try {
        const verifiedStatus = await adminwaplogin.verifyPassword("HorseInThisHouse"); 
        res.status(200).send(verifiedStatus);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

adminRouter.post("/", async (
    req: Request<String>,
    res: Response<Boolean>
) => { 
    try {
        const password = await adminwaplogin.verifyPassword(req.body.password)
        console.log(password)
        if(password){
            res.status(201).send(true);
        }
        else {
            res.status(401).send(false);
        };
    } catch (e: any) {
        res.status(500).send(false);
    }
});

adminRouter.post("/changePassword", async (req, res) => { 
    try {
        //Check that password is valid
        /*if (!await adminwaplogin.authoriseUser(req.body.newPassword) || req.body.newPassword.length > 4) { //Check that password > 4 characters and that it is not the previous password
            res.status(401).send("Invalid password");
            console.log("Invalid password")
            return;
        }*/
        console.log("Changing password to: " + req.body.newPassword);
        await adminwaplogin.changePassword(req.body.newPassword);
        res.status(201).send("Password changed successfully");
    } catch (e: any) {
        res.status(500).send("Error changing password");
    }
});

