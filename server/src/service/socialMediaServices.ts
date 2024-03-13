import { IsocialMediaServices } from './IsocialMediaServices';
import { socialMedia } from '../model/socialMedia';
import { socialMediaModel } from '../model/socialMedia.db';


export class socialMediaService implements IsocialMediaServices {
    async getSocialMedia(): Promise<socialMedia> {
        //find social media in the database
        const socialMedia = await socialMediaModel.findOne()
        //check if social media are found
        if (socialMedia) {
            return socialMedia;
        }
        else {
            //throw error if no social media found
            throw new Error("No social media found.");
        }
    }


    async updateSocialMedia(facebook: string, instagram: string, linkedin: string, twitter: string): Promise<void> {
        //delete previous social media doc in database
        await socialMediaModel.deleteMany({});
        //create a new social media doc in database
        await socialMediaModel.create({facebook: facebook, instagram: instagram, linkedin: linkedin, twitter: twitter});
        return;
    }
}

export const socialMediaServices = new socialMediaService();