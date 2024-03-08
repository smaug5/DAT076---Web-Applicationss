
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


export function mainContent() {
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


  useEffect(() => {
    getPdf();
  }, []);

  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/cv");
      setAllImage(result.data.data);

    } catch (error) {
      console.error('Error while downloading the file:', error);
    }
  };

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();



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
          <Image src={itGirlImage} alt="Logo" className="bit-girl oval-image centered-image" />
        </Col>
      </Row>
    </Container>
  );
}



export default mainContent;