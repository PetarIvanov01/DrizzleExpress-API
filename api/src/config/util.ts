import { CorsOptions } from 'cors';

export function setCorsOptions(): CorsOptions {
    const corsOpt: CorsOptions = {
        credentials: true,
    };

    if (process.env.NODE_ENV?.includes('development')) {
        corsOpt.origin = /^http:\/\/localhost:5173(?:\/.*)?$/;
    }
    return corsOpt;
}
