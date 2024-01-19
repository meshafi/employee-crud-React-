import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  height: 10vh;
  background-color: #202020;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color:white;
`;

const Logo = styled.div`
  color: white;
  font-size: 1.5rem;
`;

const AccountIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  & .MuiSvgIcon-root {
    font-size: 35px; 
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
        <h1>EmployeeDash</h1>
      <AccountIconWrapper>
        <AccountCircleIcon />
        <h3>Admin</h3>
      </AccountIconWrapper>
    </HeaderWrapper>
  );
};

export default Header;
