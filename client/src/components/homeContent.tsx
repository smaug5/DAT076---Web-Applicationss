
import React, { useState } from 'react';
import '../App.css';
import '../../src/css/main.css';
import '../../src/css/animations.css';
import translateIcon from '../../src/images/translate_icon.svg';
import itGirlImage from '../../src/images/IT-girl.jpg';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import facebook from '../images/icon_facebook.svg';
import instagram from '../images/icon_instagram.svg';
import linkedin from '../images/icon_linkedin.svg';
import twitter from '../images/icon_twitter.svg';


export function mainContent() {
  return (
    <Container fluid className="h-100 full-height">
      <Row className="h-100 full-height">
        <Col xs={6} className="d-flex flex-column">
          <div className="half-box headline">
            <div id="headline-text">
              I am Web designer Britt-Marie Svensson
            </div>
          </div>
          <div>
            <Col>
              <div className="description">
                <p id="description-text">I like to play in mud and eat grass. I am just about to finish my degree this summer and do additional photographing in my spare time.</p>
              </div>
              <div>
                <Col>
                  <div id="button-container"> 
                    <Button variant="primary" id="CV-button" className="mt-3">Download CV</Button>
                  </div>
                  <Row className="mt-3" id="social-media-row">
                    <Button variant="primary" id="social-media" className="mt-3">
                      <Image src={linkedin} alt="linkedin" id="social-media-icon" />
                    </Button>
                    <Button variant="primary" id="social-media" className="mt-3">
                      <Image src={facebook} alt="Facebook" id="social-media-icon" />
                    </Button>
                    <Button variant="primary" id="social-media" className="mt-3">
                      <Image src={instagram} alt="Instagram" id="social-media-icon" />
                    </Button>
                    <Button variant="primary" id="social-media" className="mt-3">
                      <Image src={twitter} alt="Twitter" id="social-media-icon" />
                    </Button>
                  </Row>
                </Col>
              </div>
            </Col>
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