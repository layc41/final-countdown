import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Auth from '../utils/auth';


function AppNavbar() {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };


    return (
        <>
          <Navbar className='sticky-top' expand='lg'>
            <Container fluid>
              <Navbar.Brand id='title' as={Link} to='/'>
                Movie Lot
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='navbar' />
              <Navbar.Collapse id='navbar'>
                <Nav className='ml-auto'>
                  <Nav.Link as={Link} to='/'>
                    Search
                  </Nav.Link>
                  <Nav.Link as={Link} to='/popular'>
                    Popular Movies
                  </Nav.Link>
                  {/* if user is logged in show saved books and logout */}
                  {Auth.loggedIn() ? (
                    <>
                      <Nav.Link as={Link} to='/savedmovies'>
                        See Your Lot
                      </Nav.Link>
                      <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                    </>
                  ) : (
                    <Nav>
                      <Nav.Link as={Link} to='/login'>
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to='/signup'>
                    Sign Up
                  </Nav.Link>
                    </Nav>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </> 
      );
    };

export default AppNavbar; 