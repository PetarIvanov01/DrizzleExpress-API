import { Request, Response } from "express";
import { UserLoginData, UserRegisterData } from "../../typescript/interfaces/user.interface";
import wrapController from "../helpers/wrapperTryCatch";

import { getUserById } from "../services/userService/user.queries";
import loginService from "../services/userService/userLogin";
import regService from "../services/userService/userRegister";

export const loginController = wrapController(async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const extractedData: UserLoginData = {
        email,
        password
    };

    const payload = await loginService(extractedData);

    res.status(200)
        .json({ message: "You are logged", payload });
});

export const registerController = wrapController(async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const otherInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber
    };

    const extractedData: UserRegisterData = {
        email,
        password,
        otherInfo
    };

    const payload = await regService(extractedData);

    res.status(200)
        .json({ message: "You are registered", payload });
});

export const getCurrentUser = wrapController(async (req: Request, res: Response) => {

    const { userId } = req.params;

    const payload = await getUserById(userId);

    res.status(200).
        json({ message: "Current user", payload });
});