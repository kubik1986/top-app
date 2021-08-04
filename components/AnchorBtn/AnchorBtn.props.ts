import { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface AnchorBtnProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  children: ReactNode;
  appearance: 'primary' | 'transparent';
}
