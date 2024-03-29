import type { ReactNode } from 'react';

import { Logo, NavbarTwoColumns, NavMenu, NavMenuItem, Section } from '@/ui';

const Navbar = (props: { children: ReactNode }) => (
  <Section>
    <NavbarTwoColumns>
      <a href="/">
        <Logo
          icon={
            <img
              src="/logo.svg"
              alt=""
              className="h-12 w-12 hover:translate-y-1"
              loading="lazy"
            />
          }
          name="FSGeek"
        />
      </a>

      <NavMenu>
        {props.children}
        <NavMenuItem href="/post/">Blog</NavMenuItem>
      </NavMenu>
    </NavbarTwoColumns>
  </Section>
);

export { Navbar };
