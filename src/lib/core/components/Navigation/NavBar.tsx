import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

export interface NavBarProps {}

export function NavBar() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">Chris D. Macrae</Navbar.Brand>
        <Navbar.Toggle aria-controls="primary-nav" />
        <Navbar.Collapse id="primary-nav">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/articles">Articles</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}