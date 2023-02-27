import type { ReactNode } from 'react';

type INavbarProps = {
  children: ReactNode;
};

const NavbarTwoColumns = (props: INavbarProps) => (
  <div className="flex flex-row justify-between gap-y-3 sm:flex-row sm:items-center">
    {props.children}
  </div>
);

export { NavbarTwoColumns };
