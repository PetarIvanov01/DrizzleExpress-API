import { NextFunction, Request, Response } from "express"

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(400).send({ message: 'All fields are required!', error })
}

export default errorHandler