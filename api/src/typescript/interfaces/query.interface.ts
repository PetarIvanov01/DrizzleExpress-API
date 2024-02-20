import { Request } from 'express';
import {
    CategoryQueriesType,
    Paginate,
    PriceType,
    SortType,
} from '../types/query.type';

export interface SearchQuery {
    category?: CategoryQueriesType;
    sort_by?: SortType;
    price?: PriceType;
    page?: Paginate['page'];
    perPage?: Paginate['perPage'];
}

export interface RequestWithQueryData extends Request {
    searchBy?: SearchQuery;
}
