import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

export interface NavBarProps {}

export function NavBar() {
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">Chris D. Macrae</Navbar.Brand>
      <Navbar.Toggle aria-controls="primary-nav" />
      <Navbar.Collapse id="primary-nav">
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}