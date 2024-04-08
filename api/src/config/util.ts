import { Express } from 'express';
import { CorsOptions } from 'cors';

export function setCorsOptions(app: Express) {
    const corsOpt: CorsOptions = {
        credentials: true,
    };

    if (app.get('env') === 'development') {
        corsOpt.origin = /^http:\/\/localhost:5173(?:\/.*)?$/;
    }

    return corsOpt;
}
