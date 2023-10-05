import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { StyledLink } from '../../utils/style/Atoms';
import LightLogo from '../../assets/light-logo.png';
import DarkLogo from '../../assets/dark-logo.png';
import { useTheme } from '../../utils/hooks';

const HomeLogo = styled.img`
  height: 70px;

  @media (max-width: 768px) {
    height: 50px;
  }
`;

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const NavLinks = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
    display: ${({ $menuOpen }) => ($menuOpen ? 'flex' : 'none')};
  }
`;

const MenuButton = styled.button`
  display: none;
  color: ${({ $theme }) => ($theme === 'light' ? '#8186a0' : '#ffffff')};
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;

  @media (max-width: 768px) {
    display: block;
    margin-top: 20px;
  }
`;

const LogoAndButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-center;
`;

function Header() {
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <NavContainer>
      <LogoAndButtonContainer>
        <Link to="/">
          <HomeLogo src={theme === 'light' ? DarkLogo : LightLogo} />
        </Link>
        <MenuButton onClick={toggleMenu} $theme={theme}>
          {menuOpen ? (
            <AiOutlineClose size={26} />
          ) : (
            <AiOutlineMenu size={26} />
          )}
        </MenuButton>
      </LogoAndButtonContainer>
      <NavLinks $menuOpen={menuOpen}>
        <StyledLink $theme={theme} to="/">
          Accueil
        </StyledLink>
        <StyledLink $theme={theme} to="/freelances">
          Profils
        </StyledLink>
        <StyledLink to="/survey/1" $isFullLink>
          Faire le test
        </StyledLink>
      </NavLinks>
    </NavContainer>
  );
}

export default Header;
