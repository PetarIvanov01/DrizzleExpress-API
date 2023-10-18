import { UserLoginData, UserRegisterData } from "../../interface/user.interface"

const REQUIRED_FIELDS_LOGIN: Array<keyof UserLoginData> = ['email', 'password'];
const REQUIRED_FIELDS_REGISTER: Array<keyof UserRegisterData> = ['email', 'username', 'password'];

const validateAuth = (userData: UserLoginData | UserRegisterData) => {

    type ObjectKey = keyof typeof userData

    const requiredFields = 'username' in userData ? REQUIRED_FIELDS_REGISTER : REQUIRED_FIELDS_LOGIN;

    const missingAndEmptyFields = requiredFields.flatMap(key => {

        const value = userData[key as ObjectKey];

        if (value === undefined) {
            return { field: key, value: 'Field is required' };
        }

        if (typeof value === 'string' && value === '') {
            return { field: key, value: 'Field cannot be empty' };
        }

        return [];
    });

    return missingAndEmptyFields;

}
export default validateAuth


