
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
  const handleDownload = () => {
    axios({
        url: 'http://localhost:8080/api/cv',
        method: 'GET',
        responseType: 'blob',  // binary cotent
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        const contentDisposition = response.headers['Content-Disposition'];
        console.log("Headers are:" + contentDisposition);
        let fileName = 'CV.pdf';
        if (contentDisposition) {
          const matches = /filename="?([^"]+)"?;?/i.exec(contentDisposition);
          if (matches != null && matches[1]) {
              fileName = matches[1];
          }
      }

        link.href = url;
        link.setAttribute('download', fileName);  // set original file name
        document.body.appendChild(link);
        link.click();
        link.remove();
    }).catch(error => {
        console.error('Error downloading the file:', error);
    });
  };

  const handleCVImage = (cvImage: CV | null) => {
    setCVImage(cvImage);
   //console.log('CV image set to:', cvImage);
  }

  useEffect(() => {
    updateCV(handleCVImage);
  });

  
  const getPdf = async () => {
    updateCV(handleCVImage);
  }

 /* const getPdf = async () => {
    try {
      const result = await axios.get<CV | null>("http://localhost:8080/api/cv");
      setCVImage(result.data);
      console.log('CV:', result.data);
    } 
    catch (error) {
      console.error('Error while downloading the cv:', error);
    }
  }; */


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
                    <Button variant="primary" id="CV-button" onClick={getPdf} className="mt-3">Download CV</Button>
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
          <Image src={String(cvImage?.fileName) || ''} alt="cv" />
          <Image src={itGirlImage} alt="Logo" className="bit-girl oval-image centered-image" />
        </Col>
      </Row>
    </Container>
  );
}

export async function updateCV(handleCVImage: (cvImage: CV | null) => void){
  try {
    const result = await axios.get<CV | null>("http://localhost:8080/api/cv");
    handleCVImage(result.data);
   // console.log('CV:', result.data);
   console.log('CV filename:', result.data?.contentType)
   //Log type of data:
   console.log('Type of data:', typeof result.data);
  } 
  catch (error) {
    console.error('Error while downloading the cv:', error);
  }
};



export default MainContent;