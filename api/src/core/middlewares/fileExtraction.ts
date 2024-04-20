import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.IMAGE_CLOUD_NAME_DB,
    api_key: process.env.IMAGE_API_KEY,
    api_secret: process.env.IMAGE_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5mb
    },
});

export default function fileExtractionMiddlawere(field: string) {
    return (req: Request, res: Response, next: NextFunction) =>
        upload.single(field)(req, res, next);
}
