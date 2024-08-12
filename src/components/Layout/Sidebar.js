import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
const SidebarContainer = styled(motion.div)`
  width: 250px;
  height: 100vh;
  background: ${(props) => props.theme.sidebarBackground};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Logo = styled(motion.h2)`
  font-size: 1.6rem;
  color: ${(props) => props.theme.logoColor};
  margin: 0;
`;

const CloseButton = styled(motion.button)`
  background: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonColor};
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background 0.3s ease;
  &:hover {
    background: ${(props) => props.theme.buttonHoverBackground};
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavLink = styled(motion(Link))`
  text-decoration: none;
  color: ${(props) => props.theme.linkColor};
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background 0.3s ease, color 0.3s ease;
  &:hover {
    background: ${(props) => props.theme.linkHoverBackground};
    color: ${(props) => props.theme.linkHoverColor};
  }
`;

// Animation Variants
const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: { x: '0%' },
};


const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <SidebarContainer
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      variants={sidebarVariants}
      transition={{ duration: 0.3 }}
    >
      <SidebarHeader>
        <Logo
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Trawell
        </Logo>
        <CloseButton
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          &times;
        </CloseButton>
      </SidebarHeader>
      <NavLinks>
        <NavLink to="/" whileHover={{ scale: 1.05 }}>
          Home
        </NavLink>
        <NavLink to="/dashboard" whileHover={{ scale: 1.05 }}>
          Dashboard
        </NavLink>
        <NavLink to="/profile" whileHover={{ scale: 1.05 }}>
          Profile
        </NavLink>
        <NavLink to="/settings" whileHover={{ scale: 1.05 }}>
          Settings
        </NavLink>
      </NavLinks>
    </SidebarContainer>
  );
};

export default Sidebar;
