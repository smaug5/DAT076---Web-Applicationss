import express, { Request, Response } from "express";
import { adminwaplogin, adminService } from "../service/adminService";
import { Auth } from "../model/auth";

export const adminRouter = express.Router();

/**
 * GET route handler for admin auth status
 * 
 * checks the status by verifying the provided password
 * if password is correct, it sends a res status 200 and verification status
 * if an error appears during verification, it sends res status 500 and the error
 */
adminRouter.get("/", async (
    req: Request,
    res: Response<Boolean>
) => {
    try {
        //verify provided password
        const verifiedStatus = await adminwaplogin.verifyPassword("HorseInThisHouse"); 
        //send res with verification status
        res.status(200).send(verifiedStatus);
    } catch (e: any) {
        //send error res if error during verification
        res.status(500).send(e.message);
    }
});

/**
 * POST route handler for admin auth
 */
adminRouter.post("/", async (
    req: Request<String>,
    res: Response<Boolean>
) => { 
    try {
        //verify provided password
        const password = await adminwaplogin.verifyPassword(req.body.password)
        console.log(password)

        //check if password is correct and send res
        if(password){
            res.status(201).send(true); //correct
        }
        else {
            res.status(401).send(false); //incorrect
        };
    } catch (e: any) {
        //send error res if error during auth
        res.status(500).send(false);
    }
});

/**
 * Post route handler for changing admin password
 */
adminRouter.post("/changePassword", async (req, res) => { 
    try {
        //Check that password is valid
        /*if (!await adminwaplogin.authoriseUser(req.body.newPassword) || req.body.newPassword.length > 4) { //Check that password > 4 characters and that it is not the previous password
            res.status(401).send("Invalid password");
            console.log("Invalid password")
            return;
        }*/
        //log the new password
        console.log("Changing password to: " + req.body.newPassword);

        //change the password
        await adminwaplogin.changePassword(req.body.newPassword);

        //send success res
        res.status(201).send("Password changed successfully");
    } catch (e: any) {
        //send error res if error during change
        res.status(500).send("Error changing password");
    }
});

