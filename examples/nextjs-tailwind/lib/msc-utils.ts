import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** msc- prefixed cn helper for shadcn + Tailwind class merging */
export function mscCn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
