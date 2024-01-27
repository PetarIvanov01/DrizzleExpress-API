import { Response, NextFunction } from 'express';
import { checkValidQueryParams } from '../validations/validateAndAggregateQueries';
import { RequestWithQueryData } from '../../typescript/interfaces/query.interface';
import { WORKING_QUERIES } from '../utils/_constants';
import { DefinedQueriesType } from '../../typescript/types/query.type';

export default function querryMiddlware(
    req: RequestWithQueryData,
    res: Response,
    next: NextFunction
): void {
    try {
        const definedQueries: DefinedQueriesType = {};

        WORKING_QUERIES.forEach((query) => {
            const value = req.query[query] as string | undefined;
            if (value !== undefined) {
                definedQueries[query] = value.trim();
            }
        });

        const sanitizedQueries = checkValidQueryParams(definedQueries);
        req.searchBy = sanitizedQueries;

        return next();
    } catch (error) {
        next(error);
    }
}
