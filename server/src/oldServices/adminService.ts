import { CV } from "../model/cv";
import { conn } from "../model/conn";

export class adminService {
    async authoriseUser() {
        throw new Error("Method not implemented.");
    }
    
    async verifyPassword(password: String): Promise<Boolean> { //Return true if verified
        // Replace this with code to verify password
        return (password=="HorseInThisHouse")
    }
}

export const adminwaplogin = new adminService();

