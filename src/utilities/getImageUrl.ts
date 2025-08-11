const BASE_URL = 'http://localhost:3006';

export function getImageUrl(imagen: string | null): string {
  return `${BASE_URL}/peluditos/uploads/productos/${imagen}`;
}