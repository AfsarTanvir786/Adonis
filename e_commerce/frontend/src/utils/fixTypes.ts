export function fixTypes(obj: any): any {
    if (Array.isArray(obj)) return obj.map(fixTypes);

    if (obj !== null && typeof obj === 'object') {
        const newObj: any = {};
        for (const key in obj) {
            const value = obj[key];

            if (typeof value === 'string' && value.match(/^\d+$/) && key !== 'password') {
                newObj[key] = Number(value);
            } else {
                newObj[key] = fixTypes(value);
            }
        }
        return newObj;
    }

    return obj;
}
