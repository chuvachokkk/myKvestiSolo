import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap';
import logo from '../image/123.webp';

const Header = ({ user, isAuthenticated, logout }) => {
  const avatarUrl = user?.avatar
    ? `http://localhost:3000${user.avatar}`
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxh9E8dJUZ_tVqV-9FtvXsDV5MsAdFG8eaRA&s';

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Логотип"
            style={{ width: '50px', height: '50px', marginRight: '20px' }}
          />
          Квесты
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/quests">
              Все квесты
            </Nav.Link>
            <Nav.Link as={Link} to="/add-quest">
              Добавить квест
            </Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated && user ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/profile"
                  className="d-flex align-items-center me-3"
                >
                  <Image
                    src={avatarUrl}
                    roundedCircle
                    style={{
                      width: '40px',
                      height: '40px',
                      marginRight: '10px',
                    }}
                  />
                  Привет, {user.username}!
                </Nav.Link>
                <Button className="bloody-button" onClick={logout}>
                  Выйти
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/auth">
                Войти
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;