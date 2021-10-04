import React from 'react';
import { Container } from 'react-bootstrap';
import './styles.css';

const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <div className="footer-content">
          Copyrights @ {new Date().getFullYear()}
        </div>
      </Container>
    </div>
  );
};

export default Footer;
