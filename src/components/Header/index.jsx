import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, setCurrentUser } from '../../actions';

const Header = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleGoogleLoginSucess = (response) => {
    const { tokenId } = response;
    dispatch(loginUser(tokenId));
  };

  const handleGoogleLoginFailure = (e) => {
    console.log(e);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setCurrentUser(null, false));
  };

  return (
    <>
      <Navbar variant="dark" className={'header'}>
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="brand">
            MyBlog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="me-auto" />
            &nbsp; &nbsp;
            <Nav>
              {!loading && isAuthenticated && (
                <>
                  <Nav.Link> {user.name} </Nav.Link>
                  <Nav.Link onClick={handleLogout}> Logout </Nav.Link>
                </>
              )}
              {isAuthenticated && user.role === 'admin' && (
                <Nav.Link as={NavLink} to="/new">
                  New
                </Nav.Link>
              )}
              {!loading && !isAuthenticated && (
                <span>
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    render={(renderProps) => (
                      <Nav.Link
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        Login
                      </Nav.Link>
                    )}
                    onSuccess={handleGoogleLoginSucess}
                    onFailure={handleGoogleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                  />
                </span>
              )}
              &nbsp; &nbsp;
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
