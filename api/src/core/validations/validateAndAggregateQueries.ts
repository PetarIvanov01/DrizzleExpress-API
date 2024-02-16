import { SearchQuery } from '../../typescript/interfaces/query.interface';
import { DefinedQueriesType } from '../../typescript/types/query.type';
import {
    CATEGORY_QUERIES,
    SORT_OPTIONS,
    WORKING_QUERIES,
} from '../utils/_constants';

function isCategory(value: string): boolean {
    return CATEGORY_QUERIES.some((r) => value === r);
}

function isSort(value: string): boolean {
    return SORT_OPTIONS.some((r) => value === r);
}

function isValidNumber(value: string): boolean {
    const number = Number(value);
    if (isNaN(number)) {
        return false;
    }
    if (number < 0) {
        return false;
    }
    return true;
}

function sanytizePrice(object: SearchQuery) {
    if (
        object.price?.from &&
        object.price?.to &&
        object.price.from > object.price.to
    ) {
        object.price.from = 0;
    }
}

const PREDICATS = {
    category: isCategory,
    sort_by: isSort,
    from: isValidNumber,
    to: isValidNumber,
};

export function checkValidQueryParams(
    queries: DefinedQueriesType
): SearchQuery {
    const result: SearchQuery = {};

    for (const q in queries) {
        const key = q as (typeof WORKING_QUERIES)[number];
        const predicateFunction = PREDICATS[key];

        const value = queries[key];
        if (!value) return {};

        const statement = predicateFunction(value);

        if (statement === true) {
            if (key === 'from' || key === 'to') {
                if (!result.price) {
                    result.price = {};
                }

                result.price[key] = Number(queries[key]);
                continue;
            }
            (result as any)[key] = queries[key];
        }
    }

    sanytizePrice(result);
    return result;
}
