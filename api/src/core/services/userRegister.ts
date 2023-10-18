import { UserRegisterData } from "../../interface/user.interface";
import validateAuth from "../validations/validateRegister";

const regService = async (userData: UserRegisterData) => {

    const errors = validateAuth(userData);

    try {
        if (errors.length > 0) {
            throw errors
        }

        //TODO implement register logic

        return

    } catch (error) {
        throw error
    }

}

export default regService