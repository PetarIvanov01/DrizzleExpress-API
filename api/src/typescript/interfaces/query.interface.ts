import { Request } from 'express';
import { CategoryQueriesType, PriceType, SortType } from '../types/query.type';

export interface SearchQuery {
    category?: CategoryQueriesType;
    sort?: SortType;
    price?: PriceType;
}

export interface RequestWithQueryData extends Request {
    searchBy?: SearchQuery;
}
