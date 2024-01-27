import { Injectable } from '@angular/core';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
@Injectable({
  providedIn: 'root',
})
export class TailwindUtilService {
  public cn(...classes: string[]): string {
    return twMerge(clsx(classes));
  }
}
