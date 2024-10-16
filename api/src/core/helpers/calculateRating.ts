function calculatedRating(ratings: number[]) {
    if (ratings.length === 0) {
        return 0;
    }

    const sum = ratings.reduce((prev: number, curr: number) => {
        return prev + curr;
    }, 0);

    let calcRating = sum / ratings.length;
    calcRating = Math.max(1, Math.min(calcRating, 5));
    calcRating = Math.ceil(calcRating);

    return calcRating;
}
export { calculatedRating };
