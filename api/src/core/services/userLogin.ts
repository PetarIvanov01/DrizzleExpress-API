import { UserLoginData } from "../../interface/user.interface";
import validateAuth from "../validations/validateRegister";

const loginService = async (userData: UserLoginData) => {

    const errors = validateAuth(userData);

    try {
        if (errors.length > 0) {
            throw errors
        }

        //TODO implement login logic


        return
    } catch (error) {
        throw error
    }


}
export default loginService
