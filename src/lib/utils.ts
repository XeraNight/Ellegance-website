import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BASE_PATH = '';

export function getAssetPath(path: string) {
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const encodedPath = cleanPath.split('/').map(encodeURIComponent).join('/');
  return BASE_PATH ? `${BASE_PATH}/${encodedPath}` : `/${encodedPath}`;
}
