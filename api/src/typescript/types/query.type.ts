export type CategoryQueriesType = 'cardio' | 'free-weights' | 'machines';
export type RatingQueriesType = 1 | 2 | 3 | 4 | 5;

export type SearchQuery = {
    category?: CategoryQueriesType,
    rating?: RatingQueriesType
};
