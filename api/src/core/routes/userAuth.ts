import { Router } from "express";
import { loginController, registerController } from "../controllers/userAuth"

export const userAuthRoute = Router();

userAuthRoute.post('/sign-in', loginController);
userAuthRoute.post('/sign-up', registerController);