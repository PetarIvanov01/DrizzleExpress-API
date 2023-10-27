import { Request, Response } from "express";
import { UserLoginData, UserRegisterData } from "../../interface/user.interface";
import wrapController from "../helpers/wrapperTryCatch";
import loginService from "../services/userLogin";
import regService from "../services/userRegister";

export const loginController = wrapController(async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const extractedData: UserLoginData = {
        email,
        password
    };

    const token = await loginService(extractedData);

    res.status(200)
        .send({ message: "You are logged", token });
})

export const registerController = wrapController(async (req: Request, res: Response) => {

    const { email, password, username } = req.body;

    const extractedData: UserRegisterData = {
        email,
        password,
        username
    };

    const token = await regService(extractedData);

    res.status(201)
        .send({ message: "You are registered", token });
})