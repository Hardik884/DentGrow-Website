'use client';

import Image from 'next/image';
import {
  Wrapper,
  Inner,
  LogoContainer,
  Nav,
  CallToActions,
  BurgerMenu,
} from './styles';
import ic_bars from '../../../../public/svgs/ic_bars.svg';
import { GetStartedButton, Logo } from '@/components';
import AnimatedLink from '@/components/Common/AnimatedLink';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { links, menu } from './constants';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Wrapper>
      <Inner>
        <LogoContainer>
          <Logo size={29} />
          <BurgerMenu
            onClick={() => setIsOpen(!isOpen)}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            data-testid="menu-toggle"
          >
            <motion.div
              variants={menu}
              animate={isOpen ? 'open' : 'closed'}
              initial="closed"
            ></motion.div>
            <Image src={ic_bars} alt="bars" />
          </BurgerMenu>
        </LogoContainer>
        <Nav className={isOpen ? 'active' : ''} data-testid="site-nav">
          {links.map((link, i) => (
            <AnimatedLink
              key={i}
              title={link.linkTo}
              href={link.href}
              /* Tapping a link on mobile navigates, so the panel it was in
                 should not still be sitting over the section it went to. */
              onNavigate={() => setIsOpen(false)}
            />
          ))}
        </Nav>
        {/* Book a Demo is the only action in the header: this is a marketing
            site, so it carries no sign-in or account links. */}
        <CallToActions className={isOpen ? 'active' : ''}>
          <GetStartedButton size="compact" />
        </CallToActions>
      </Inner>
    </Wrapper>
  );
};

export default Header;
