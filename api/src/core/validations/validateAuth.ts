import { RegisterOtherInfoT, UserLoginData, UserRegisterData } from "../../typescript/interfaces/user.interface";

type ObjectKey<T> = keyof T;

const validateFields = <T>(data: T, requiredFields: Array<ObjectKey<T>>) => {
    return requiredFields.flatMap(key => {
        const value = data[key];
        if (value === undefined) {
            return { field: key, value: 'Field is required' };
        }
        if (typeof value === 'string' && value === '') {
            return { field: key, value: 'Field cannot be empty' };
        }
        return [];
    });
};

const REQUIRED_AUTH_FIELDS: Array<ObjectKey<UserLoginData>> = ['email', 'password'];
export const validateAuth = (userData: UserLoginData) => validateFields(userData, REQUIRED_AUTH_FIELDS);

const REQUIRED_REGISTER_OTHER_FIELDS: Array<ObjectKey<RegisterOtherInfoT>> = ["firstName", "lastName", "phoneNumber"];
export const validateRegisterOtherInfo = (otherInfo: RegisterOtherInfoT) => validateFields(otherInfo, REQUIRED_REGISTER_OTHER_FIELDS);
