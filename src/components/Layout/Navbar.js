import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled Components
const NavbarContainer = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${(props) => props.theme.navbarBackground};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
`;

const Logo = styled(motion.h1)`
  font-size: 1.8rem;
  color: ${(props) => props.theme.logoColor};
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(motion(Link))`
  text-decoration: none;
  color: ${(props) => props.theme.linkColor};
  font-size: 1.2rem;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    color: ${(props) => props.theme.linkHoverColor};
    transform: translateY(-2px);
  }
`;

const ThemeToggleButton = styled(motion.button)`
  background: ${(props) => props.theme.toggleBackground};
  color: ${(props) => props.theme.toggleColor};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease, color 0.3s ease;
  &:hover {
    background: ${(props) => props.theme.toggleHoverBackground};
    color: ${(props) => props.theme.toggleHoverColor};
  }
`;

// Animation Variants
const navbarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

// Navbar Component
const Navbar = ({ toggleTheme, isDarkMode }) => {
  return (
    <NavbarContainer
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      transition={{ duration: 0.5, type: 'spring', stiffness: 80 }}
    >
      <Logo
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Trawell
      </Logo>
      <NavLinks>
        <NavLink to="/" whileHover={{ scale: 1.1 }}>Home</NavLink>
        <NavLink to="/dashboard" whileHover={{ scale: 1.1 }}>Dashboard</NavLink>
        <NavLink to="/profile" whileHover={{ scale: 1.1 }}>Profile</NavLink>
        <NavLink to="/settings" whileHover={{ scale: 1.1 }}>Settings</NavLink>
      </NavLinks>
      <ThemeToggleButton
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </ThemeToggleButton>
    </NavbarContainer>
  );
};

export default Navbar;
