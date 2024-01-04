import { Router, } from "express";
import multer from "multer";
import path from "path";

import { getCatalogController, insertCatalogController } from "../controllers/catalog";
import querryMiddlware from "../middlewares/extractQuerry";
import authChecker from "../middlewares/authentication";

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

export const catalogRoute = Router();

catalogRoute.post('/', upload.single('image'), authChecker, insertCatalogController);
catalogRoute.get('/',
    querryMiddlware,
    getCatalogController);
