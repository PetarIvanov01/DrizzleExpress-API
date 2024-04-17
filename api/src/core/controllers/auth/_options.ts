import { CookieOptions } from 'express';

const oneWeekInMilliseconds = 1000 * 60 * 60 * 24 * 7;
export const COOKIE_NAME = 'jwt-refresh';

export const COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: oneWeekInMilliseconds,
    path: '/api/v1/users/refreshtoken',
    sameSite: process.env.NODE_ENV?.includes('production') ? 'none' : 'strict',
    secure: process.env.NODE_ENV?.includes('production') ? true : false,
} as CookieOptions;
