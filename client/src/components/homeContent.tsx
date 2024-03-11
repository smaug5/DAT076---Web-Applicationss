
import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { saveAs } from 'file-saver';
import { pdfjs } from "react-pdf";
import PdfComp from "../components/pdfComp";
import {CV} from '../../../server/src/model/cv';


export function MainContent() {
  const [cvImage, setCVImage] = useState( null as CV | null);
  const [cvEnabled, setCVEnabled] = useState(false);
  const handleCVDownload = () => {
    if (cvImage && cvImage.image) {
      // Extract the base64 data from the string
      const base64Response = cvImage.image.split(';base64,').pop();
  
      // Convert it to a blob
      const blob = base64ToBlob(base64Response, 'image/png');
  
      // Use the FileSaver library to save the blob as a PNG file
      saveAs(blob, "CV.png");
    } else {
      console.error('CV image is not available for download');
    }
  };
  
  // Helper function to convert a base64 string to a Blob
  const base64ToBlob = (base64:any, mimeType:any) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
  
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    return new Blob(byteArrays, {type: mimeType});
  };
  

  const handleCVImage = (cvImage: CV | null) => {
    setCVImage(cvImage);
  }

  useEffect(() => {
    updateCV(cvImage, handleCVImage);
  });

  
  const showCV = async () => {
    setCVEnabled(!cvEnabled);
    if (cvImage === null) {
      
      updateCV(cvImage, handleCVImage);
    }
  }

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
                    <Button variant="primary" id="CV-button" onClick={showCV}>Show CV</Button>
                  </div>
                  { cvEnabled && 
                  <Col>
                    <div id="button-container">
                      <Button variant="primary" id="CV-button" onClick={handleCVDownload}>Download CV</Button>
                    </div>
                    <Row className="mt-3" id="cvImage">
                      <Image src={String(cvImage?.image)} alt="CV" id="cv-image" />
                    </Row>
                  </Col>
                  }
                  { !cvEnabled && <Row className="mt-3" id="social-media-row">
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
                  </Row>}
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

export async function updateCV(cvImage: any, handleCVImage: (cvImage: CV) => void){
  try {
    if (cvImage === null) {
      const result = await axios.get<CV>("http://localhost:8080/api/cv");
      handleCVImage(result.data);
      console.log('CV:', result.data);
    }
    
   //console.log('CV filename:', result.data.image)
   //Log type of data:
   //console.log('Type of data:', typeof result.data?.image);
  } 
  catch (error) {
    console.error('Error while downloading the cv:', error);
  }
};



export default MainContent;