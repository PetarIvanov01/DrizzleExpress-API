function takeUniqueOrThrow<T extends any[]>(values: T): T[number] {
    if (values.length !== 1) return;
    return values[0]!;
}

export default takeUniqueOrThrow;
