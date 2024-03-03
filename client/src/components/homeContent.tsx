
import React, { useState } from 'react';
import '../App.css';
import '../../src/css/main.css';
import '../../src/css/animations.css';
import translateIcon from '../../src/images/translate_icon.svg';
import itGirlImage from '../../src/images/IT-girl.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';


export function mainContent() {
  return (
    <Container fluid className="h-100 full-height">
      <Row className="h-100 full-height">
        <Col xs={6} className="d-flex flex-column">
          <div className="half-box headline">
              I am Web designer Britt-Marie Svensson
          </div>
          <div className="half-box description">
            I like to play in mud and eat grass. I am just about to finish my degree this summer and do additional photographing in my spare time.
          </div>
        </Col>
        <Col xs={6} className="d-flex justify-content-center align-items-center full-height">
          <Image src={itGirlImage} alt="Logo" className="bit-girl oval-image centered-image" />
        </Col>
      </Row>
    </Container>
  );
}


export default mainContent;