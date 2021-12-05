import React from 'react';
import {Container, CssBaseline} from "@material-ui/core";
import AppToolbar from "../AppToolbar/AppToolbar";

const Layout = ({children}) => {
  return (
    <>
      <CssBaseline/>
      <AppToolbar/>
      <main>
        <Container>
          {children}
        </Container>
      </main>
    </>
  );
};

export default Layout;