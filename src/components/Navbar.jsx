// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 35px;
  background-color: rgb(79, 78, 78);
  padding: 5px 20px;
  z-index: 999;
  box-sizing: border-box;
`;

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;

const Li = styled.li`
  margin: 0 10px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

// Navbar Component

const Navbar = () => {
  return (
    <Nav>
      <Ul>
        <Li>
          <StyledLink to="/">Lyrics</StyledLink>
        </Li>
        <Li>
          <StyledLink to="/songs">Songs</StyledLink>
        </Li>
        <Li>
          <StyledLink to="/admin">Admin</StyledLink>
        </Li>
        <Li>
          <StyledLink to="/lyrics">Lyrics</StyledLink>
        </Li>
      </Ul>
    </Nav>
  );
};

export default Navbar;
