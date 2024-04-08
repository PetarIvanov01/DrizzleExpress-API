import { Request } from 'express';

export interface UserLoginData {
    email: string;
    password: string;
}

export type RegisterOtherInfoT = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
};

export interface UserRegisterData {
    email: string;
    password: string;
    otherInfo: RegisterOtherInfoT;
}

export interface AuthToken {
    id: number;
    email: string;
}

export interface RequestUserProp extends Request {
    user?: AuthToken;
}

export interface UserUpdateDataTypes {
    shippingInfo?: {
        city?: string;
        address?: string;
        country?: string;
        postcode?: number;
    };
    personalInfo?: {
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
    };
}

export interface UserReturnData {
    id: string;
    email: string;
    fullName: string;
    password: string;
    type: 'admin' | 'user';
}
