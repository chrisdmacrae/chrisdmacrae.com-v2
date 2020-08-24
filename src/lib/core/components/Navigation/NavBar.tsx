import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import AppStateContext from '../../state/app';

export interface NavBarProps {
  children?: {
    start?: React.ReactChild
    end?: React.ReactChild
  }
}

export function NavBar({ children }: NavBarProps) {  
  const { colorScheme } = useContext(AppStateContext);

  return (
    <Navbar expand="lg" variant={colorScheme === "light" ? "light" : "dark"}>
      <Container>
        {children && children.start && (
          <div className="ml-auto">
            { children.start }
          </div>
        )}
        <Navbar.Brand href="/" className="mr-auto">Chris D. Macrae</Navbar.Brand>
        <Navbar.Toggle aria-controls="primary-nav" />
        <Navbar.Collapse id="primary-nav">
          <Nav as="ul" className="mr-auto">
            <Nav.Item as="li">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        {children && children.end && (
          <div className="mr-auto">
          { children.end }
          </div>
        )}
      </Container>
    </Navbar>
  );
}