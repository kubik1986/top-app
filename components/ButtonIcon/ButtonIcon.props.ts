import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import up from './up.svg';
import cross from './cross.svg';
import burger from './burger.svg';

export const icons = { up, cross, burger };

export type IconName = keyof typeof icons;

export interface ButtonIconProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: IconName;
  color: 'primary' | 'white';
}
