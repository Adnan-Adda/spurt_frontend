import apiClient from './apiClient';
import {ImageUpload} from "@/shared/types";

class MediaService {
    uploadImage(imageUpload: ImageUpload) {
        return apiClient.post('/media/upload-file', imageUpload)
    }
}

export const mediaService = new MediaService();