import { Auth } from "../model/auth";
import { conn } from "../model/conn";
import { IadminService } from "./IadminService";
import { authModel } from "../model/auth.db";

export class adminService implements IadminService{
    async authoriseUser(password: String) {
        return false;
    }
    
    async verifyPassword(password: String): Promise<Boolean> { //Return true if verified
        //base64 is encoding the password   
        console.log("Reached verifyPassword")
        const encodedPassword = Buffer.from(password.toString()).toString('base64');
        

        //Get the password the single object on the database
        const dbPassword = await authModel.findOne();

        console.log("Database password: " + dbPassword?.password);
        console.log("Encoded password: " + encodedPassword);

        if (dbPassword?.password == null) {
            return false;
        }

        return (dbPassword.password == encodedPassword);

        //return (password=="HorseInThisHouse")
    }

    async changePassword(password: String) {
        const encodedPassword = Buffer.from(password.toString()).toString('base64');
        await authModel.deleteMany({});
        const auth = new authModel({password: encodedPassword});
        auth.save();
    }
}

export const adminwaplogin = new adminService(); 

