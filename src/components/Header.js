import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import AuthContext from './context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
function NavScrollExample() {
  
  let {user, logoutUser} = useContext(AuthContext)
 
 if(user){
  return (
     
    <Navbar className='bg-warning bg-gradient text-dark'  expand="lg">
      <Container >
        <Col xs={6}>
        <Navbar.Brand href="#">OffGest</Navbar.Brand>
        </Col>
        <Col xs={6}>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
       
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* <Nav.Link href="/all">Recette</Nav.Link>
            <Nav.Link href="#action2">Achats</Nav.Link> */}
            <NavDropdown title=" Recette" id="navbarScrollingDropdown" >
             
              <NavDropdown.Item href="/add_data">Ajout</NavDropdown.Item>
              <NavDropdown.Item href="/all">
                Consulter/Editer
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5" >
                Stats
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title=" Achats" id="navbarScrollingDropdown">
             
              <NavDropdown.Item href="#action3">Ajout</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Consulter/Editer
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Stats
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">Contact</Nav.Link>
            <NavDropdown title={` Bienvenue :${user && user.username}`} className="user-corner" id="navbarScrollingDropdown">
             

              {user ? (
              
              <NavDropdown.Item onClick={logoutUser} >
                Logout
              </NavDropdown.Item>) : ''}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </Col>
      </Container>
    </Navbar> 
  );
 } else{
  return null
 }
  
}

export default NavScrollExample;
