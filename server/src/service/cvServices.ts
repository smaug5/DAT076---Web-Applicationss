import { CV } from "../model/cv";

export class CVServices {
    private cv : CV | undefined; //Create default CV here, dunno how so I put 0

    async getCV(): Promise<CV> {
        return JSON.parse(JSON.stringify(1)); // Replace this with code to get CV from database,
    }

    async addCV(cvString: String) {

        const cv: CV = {
            serialPdf: cvString 
          };

        const cool_cv: CV = {
            serialPdf: cvString,
        }
        this.cv = cool_cv;
        //Add to database here
    }

    async removeCV(cv: CV): Promise<CV | undefined> {
        if (this.cv === undefined) {
            return undefined;
        }
        const currentCV = JSON.parse(JSON.stringify(this.cv));
        this.cv = undefined;

        //Add code to remove CV from Database
        return { serialPdf: currentCV.serialPdf };
    }
}
export const cvService: CVServices = new CVServices();