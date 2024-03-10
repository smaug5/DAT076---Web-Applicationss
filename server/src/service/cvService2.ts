import { IcvService } from '../service/IcvService';
import { CV } from '../model/cv';
import { cvModel } from '../model/cv.db';  




export class cvService2 implements IcvService {

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

export const cvServices2: cvService2 = new cvService2();