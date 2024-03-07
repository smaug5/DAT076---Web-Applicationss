import express, { Request, Response } from "express";
import { adminwaplogin, adminService } from "../service/adminService";
import { Session } from "inspector";

export const adminRouter = express.Router();
//add in start.ts

interface RegisterRequest extends Request {
    params : {},
    body : { password : string }
}

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
