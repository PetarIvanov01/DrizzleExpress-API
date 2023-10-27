import { NextFunction, Request, Response } from "express"

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error);


    return res.status(400).send(error)
}

export default errorHandler