export default function withTryCatch(func: Function) {
    try {
        return func;
    } catch (error) {
        console.error(error);
        throw error;
    }
}