import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import AppStateContext from '../../state/app';

export interface NavBarProps {
  children?: {
    start?: React.ReactChild
    middle?: React.ReactChild
    end?: React.ReactChild
  }
}

export function NavBar({ children }: NavBarProps) {  
  const { colorScheme } = useContext(AppStateContext);

  return (
    <Navbar expand="lg" variant={colorScheme === "light" ? "light" : "dark"}>
      <Container>
        {children?.start && (
          <div className="ml-auto">
            { children.start }
          </div>
        )}
        <Navbar.Brand href="/" className="mr-auto">Chris D. Macrae</Navbar.Brand>
        <Navbar.Toggle aria-controls="primary-nav" />
        <Navbar.Collapse id="primary-nav">
          <Nav as="ul" className="ml-lg-4 mr-auto">
            <Nav.Item as="li">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="/articles">Articles</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav>
            {children?.middle && (
              <>
                { children.middle }
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        {children?.end && (
          <div className="ml-auto">
          { children.end }
          </div>
        )}
      </Container>
    </Navbar>
  );
}