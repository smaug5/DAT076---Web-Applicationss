import express, { Request, Response } from "express";
import { adminwaplogin, adminService } from "../service/adminService";

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
    req: Request,
    res: Response<Boolean>
) => { 
    try {
        await adminService.authoriseUser();
        res.status(201).send(true);
    } catch (e: any) {
        res.status(500).send(false);
    }
});
