import { CV } from "../model/cv";

export class CVServices {
    private cv : CV | undefined; //Create default CV here, dunno how so I put 0

    async getCV(): Promise<CV> {
        return JSON.parse(JSON.stringify(1)); // Replace this with code to get CV from database,
    }

    async addCV(cvFile: File) {

        const cv: CV = {
            file: cvFile 
          };

        const cool_cv: CV = {
            file: cvFile,
        }
        this.cv = cool_cv;
        //Add to database here
    }

    async removeCV(cv: CV): Promise<CV | undefined> {
        if (! cv) {
            return undefined;
        

        //Add code to remove CV from Database
        return { ...cv };
        }
    }
}
export const cvService: CVServices = new CVServices();