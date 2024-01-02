import { Request } from "express";

export interface UserLoginData {
    email: string,
    password: string,
}

export interface UserRegisterData {
    email: string,
    password: string,
    username: string,
}

export interface RequestUserProp extends Request {
    user?: any
}