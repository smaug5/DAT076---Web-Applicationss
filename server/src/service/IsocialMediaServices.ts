import { socialMedia } from "../model/socialMedia";
export interface IsocialMediaServices {
    getSocialMedia(): Promise<socialMedia>;
    updateSocialMedia(facebook: string, instagram: string, linkedin: string, twitter: string): Promise<void>;
}