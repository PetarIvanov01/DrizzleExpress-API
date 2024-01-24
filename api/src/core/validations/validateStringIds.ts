export default function validateItemsStringId(stringifyIds: string): boolean {
    const REGEX_VALIDATION = /^\[([0-9]+,([0-9]+,)*)?[0-9]+\]$/;

    if (REGEX_VALIDATION.test(stringifyIds) === false) return false;

    return true;
}