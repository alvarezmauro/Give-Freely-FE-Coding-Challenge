import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomElementFomArray(array: any[] = []) {
  return array[Math.floor(Math.random() * array.length)];
}
