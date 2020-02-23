export function generateURL(mode: string): string {
    return mode === 'prod' ? 'http://chulphan.me/api/v1' : 'http://localhost:1323/api/v1';
}