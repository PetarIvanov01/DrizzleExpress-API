import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        const destinationPath = path.resolve(__dirname, '../../../public/uploads');
        callback(null, destinationPath)
    },
    filename(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

export default function fileExtractionMiddlawere(field: string) {
    return (req: Request, res: Response, next: NextFunction) => upload.single(field)(req, res, next);
}