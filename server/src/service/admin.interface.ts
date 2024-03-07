import { login } from "../model/login";

export interface IAdminService {
    find(password : string): Promise<boolean>
}