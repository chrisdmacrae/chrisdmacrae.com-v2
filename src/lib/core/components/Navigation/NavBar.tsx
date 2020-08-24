import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Row } from 'react-bootstrap';
import { useColorScheme } from '../../hooks/useColorScheme';

export interface NavBarProps {}

export function NavBar() {
  let [scheme] = useColorScheme("light");
  
  return (
    <Navbar expand="lg" variant={scheme === "light" ? "light" : "dark"}>
      <Container>
        <Navbar.Brand href="/" className="mr-auto">Chris D. Macrae</Navbar.Brand>
        <Navbar.Toggle aria-controls="primary-nav" />
        <Navbar.Collapse id="primary-nav">
          <Nav as="ul" className="mr-auto">
            <Nav.Item as="li">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}