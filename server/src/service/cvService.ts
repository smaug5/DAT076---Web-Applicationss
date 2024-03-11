import { IcvService } from './IcvService';
import { CV } from '../model/cv';
import { cvModel } from '../model/cv.db';  




export class cvService implements IcvService {

    public async getCV(): Promise<CV> {
        const cv = await cvModel.findOne();
        if (cv === null) {
            throw new Error("No CV found");
        }
        return cv;
    }

    public async replaceCV(cv: CV): Promise<void> {
        await cvModel.deleteMany({});
        await cvModel.create(cv);
    }
}

export const cvServices: cvService = new cvService();