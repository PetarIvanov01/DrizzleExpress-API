import { CorsOptions } from 'cors';

export function setCorsOptions(): CorsOptions {
    const corsOpt: CorsOptions = {
        credentials: true,
        origin: /^http:\/\/localhost:5173(?:\/.*)?$/,
    };

    if (process.env.NODE_ENV?.includes('production')) {
        corsOpt.origin = /^https:\/\/fitness-store-a1206.web.app(?:\/.*)?$/;
    }
    return corsOpt;
}
