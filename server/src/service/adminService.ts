import { CV } from "../model/cv";


export class adminService {
    private cv : CV | undefined 


    
    async verifyPassword(password: String): Promise<Boolean> { //Return true if verified
        // Replace this with code to verify password
        


        return (password=="HorseInThisHouse")
    }

    //const hashPassword = await bcrypt.hash(password, 12);
}

export const adminwaplogin = new adminService();

