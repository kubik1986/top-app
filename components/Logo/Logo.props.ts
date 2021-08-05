import { DetailedHTMLProps, AnchorHTMLAttributes } from 'react';

export interface LogoProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  isLink?: boolean;
}
