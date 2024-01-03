import { Request, Response, NextFunction } from "express";
import { SearchQuery } from "../../typescript/types/query.type";
import { checkValidQueryParams } from "../validations/validateAndAgrigateQuery";

export interface RequestWithQueryData extends Request {
    searchBy?: SearchQuery
};

export default function querryMiddlware(req: RequestWithQueryData, res: Response, next: NextFunction): void {

    try {
        const queries = req.query;

        const sanitizedQueries = checkValidQueryParams(queries);
        req.searchBy = sanitizedQueries;

        return next();
    } catch (error) {
        next(error);
    }
}; 