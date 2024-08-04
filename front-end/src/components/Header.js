import React from 'react';
import styled from 'styled-components';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <header>
        <HeaderBlock>
          <StyledNavLink to="/">HOME</StyledNavLink>
          <SubBlock>
            <StyledNavLink to="/add">ADD</StyledNavLink>
            <StyledNavLink to="/find">FIND</StyledNavLink>
            {isAuthenticated ? (
              <StyledNavLink to="/mypage">MYPAGE</StyledNavLink>
            ) : (
              <StyledNavLink to="/login">LOGIN</StyledNavLink>
            )}
          </SubBlock>
        </HeaderBlock>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Header;

const HeaderBlock = styled.div`
  width: 1040px;
  height: 100px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  z-index: 1000;
`;

const SubBlock = styled.div`
  display: flex;
  gap: 40px; /* 링크 사이의 간격 설정 */
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #ff4c4c;
  font-size: 25px;
  padding: 5px 15px;
  border-radius: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: white;
  }
`;
