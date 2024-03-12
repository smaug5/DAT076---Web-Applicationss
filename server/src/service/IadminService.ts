import { Auth } from "../model/auth";
export interface IadminService{

    // Authorises current user with password
    authoriseUser(password: String): Promise<Boolean>;

    // Verifies password
    verifyPassword(password: String): Promise<Boolean>;


    // Changes password
    changePassword(password: String): void;
}