import { Express, urlencoded, static as _static } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import bodyTrimmer from '../core/middlewares/trimBody';

export default function expressConfig(app: Express) {
    app.use(cors({ credentials: true }));
    app.use(bodyParser.json());
    app.use(urlencoded({ extended: true }));

    app.use(bodyTrimmer);
    app.use(_static('public'));

    app.use(cookieParser());
}
