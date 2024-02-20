import { WORKING_QUERIES } from '../../core/utils/_constants';

export type CategoryQueriesType = 'cardio' | 'free-weights' | 'machines';
export type SortType = 'asc' | 'desc';
export type PriceType = {
    from?: number;
    to?: number;
};

export type Paginate = {
    page?: number;
    perPage?: number;
};

export type DefinedQueriesType = {
    [Key in (typeof WORKING_QUERIES)[number]]?: string;
};
