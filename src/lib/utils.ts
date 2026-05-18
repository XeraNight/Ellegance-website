import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/Ellegance-website' : '';

export function getAssetPath(path: string) {
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return BASE_PATH ? `${BASE_PATH}/${cleanPath}` : `/${cleanPath}`;
}
