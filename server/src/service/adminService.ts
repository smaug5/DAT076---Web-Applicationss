import { CV } from "../model/cv";

export class adminService {
    static authoriseUser() {
        throw new Error("Method not implemented.");
    }
    private cv : CV | undefined 
    
    async verifyPassword(password: String): Promise<Boolean> { //Return true if verified
        // Replace this with code to verify password
        return (password=="HorseInThisHouse")
    }
}

export const adminwaplogin = new adminService();

