import express, { Request, Response } from "express";
import { adminServices, adminService } from "../service/adminService";

export const adminRouter = express.Router();

adminRouter.get("/", async (
    req: Request,
    res: Response<Boolean>
) => {
    try {
        const verifiedStatus = await adminService.verifyPassword("HorseInThisHouse"); 
        res.status(200).send(verifiedStatus);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
