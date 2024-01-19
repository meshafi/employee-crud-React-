import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from 'styled-components';
const Container=styled.div`
  display: grid;
  grid-template-columns:1fr 10fr;
`
const Layout = ({ children }) => {
  return (
    <div style={{ position: 'relative' }}>

      <Header />
      <Container>
      <Sidebar />
      <div >
        {children}
      </div>
      </Container>
    </div>
  );
};

export default Layout;
