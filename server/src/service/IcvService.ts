import { CV } from "../model/cv";
export interface IcvService {
     // Returns a deep copy of the current list of tasks
    getCV() : Promise<CV>;

    // Replaces the current CV with a new one
    replaceCV(cv: CV): Promise<void>;
}