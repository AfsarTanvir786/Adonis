export function toSnakeCase(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map((v) => toSnakeCase(v));
    }

    if (obj !== null && typeof obj === 'object') {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            const snake = key.replace(
                /[A-Z]/g,
                (letter) => `_${letter.toLowerCase()}`
            );
            acc[snake] = toSnakeCase(value);
            return acc;
        }, {} as any);
    }

    return obj;
}
