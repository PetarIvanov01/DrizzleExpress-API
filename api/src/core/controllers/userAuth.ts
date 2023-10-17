import { Request, Response } from "express";

export const loginController = (req: Request, res: Response) => {

    const { username, password } = req.body;




    return;
}

export const registerController = (req: Request, res: Response) => {

    const { username, password, rePassword } = req.body;


    return;
}