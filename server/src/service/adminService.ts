import { CV } from "../model/cv";

export class adminServices {
    private cv : CV = 0//Create default CV here, dunno how so I put 0

    async getCV(): Promise<CV> {
        return JSON.parse(JSON.stringify(this.cv)); // Replace this with code to get CV from database,
    }

    async addCV(id: Number, cvFile: File): Promise<CV> {
        const cool_cv = {
            id: id,
            file: cvFile,
        }
        this.cv = cool_cv;
        return { ...this.cv };
    }

    async removeCV(id: number, cv: CV): Promise<CV | undefined> {
        if (! cv) {
            return undefined;
        }

        //Add code to remove CV from Database
        return { ...cv };
    }
}