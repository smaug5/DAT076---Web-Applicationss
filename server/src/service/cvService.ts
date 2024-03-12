import { IcvService } from './IcvService';
import { CV } from '../model/cv';
import { cvModel } from '../model/cv.db';  



/**
 * provides methods for retrieving, removing and replacing cv data
 */
export class cvService implements IcvService {

    public async getCV(): Promise<CV> {
        //find and return cv data
        const cv = await cvModel.findOne();
        if (cv === null) {
            throw new Error("No CV found");
        }
        return cv;
    }

    // Used internally and not exposed
    public async removeCv(): Promise<void> {
        //delete all cv docs
        await cvModel.deleteMany({});
    }

    //replaces the existing cv data with new cv data
    public async replaceCV(cv: CV): Promise<void> {
        //remove existing data
        await cvModel.deleteMany({});
        //create and save new cv data
        await cvModel.create(cv);
    }
}

export const cvServices: cvService = new cvService();