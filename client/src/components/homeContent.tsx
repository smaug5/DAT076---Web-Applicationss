
import { useEffect, useState } from 'react';
import '../App.css';
import '../../src/css/main.css';
import '../../src/css/animations.css';
import itGirlImage from '../../src/images/IT-girl.jpg';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import facebook from '../images/icon_facebook.svg';
import instagram from '../images/icon_instagram.svg';
import linkedin from '../images/icon_linkedin.svg';
import twitter from '../images/icon_twitter.svg';
import axios from 'axios';
import { saveAs } from 'file-saver';
import {CV} from '../../../server/src/model/cv';
import { IconContext, IconType } from 'react-icons';
import { FaFacebook } from 'react-icons/fa'; 
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';




export function MainContent() {
  const [cvImage, setCVImage] = useState( null as CV | null);
  const [cvEnabled, setCVEnabled] = useState(false);
  
  /**
   * Lambda function that handles the download of CV image
   * 
   * Checks if CV image is available, converts to blob object
   * and download to specified filename
   */
  const handleCVDownload = () => {
    //check if image exists and has property
    if (cvImage && cvImage.image) {
      //extract base64 data from image
      const base64Response = cvImage.image.split(';base64,').pop();
      //convert base64 data to blob object 
      const blob = base64ToBlob(base64Response, 'image/png');
  
      //download the blob as a file
      saveAs(blob, "Jonathans_cv.png");
    } else {
      //log error message if image is not available
      console.error('CV image is not available for download');
    }
  };
  
  /**
   * converts a base64-encoded string to blob object
   * 
   * @param base64 - the base64-encoded string to convert
   * @param mimeType - the MIME type of the resulting Blob object
   * @returns a blob object representing the binary data of the base64-encoded string. 
   */
  const base64ToBlob = (base64:any, mimeType:any) => {   // Helper function to convert our CV-base64 string to a Blob, ty stack overflow <3
    //decode the base64 string to byte chars
    const byteCharacters = atob(base64);
    //initialize an array to store byte arrays
    const byteArrays = [];

    //iterate over byte chars in chunks of 512 bytes
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
  
      //convert each char in the chunk to a byte num
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      //create a uint8array from the byte nums
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    //create a blob object from array with spec mime type
    return new Blob(byteArrays, {type: mimeType});
  };
  

  //update current CV image state
  const handleCVImage = (cvImage: CV | null) => {
    setCVImage(cvImage);
  }

  /**
   * hook to update the CV when it changes
   * 
   * triggers updateCV whenever the cvimage state changes
   * ensures that cv updates accordingly
   */
  useEffect(() => {
    updateCV(cvImage, handleCVImage);
    getSocialMedia();
  });

  /**
   * Toggles visibility of the cv and updates if necessary
   * 
   * if cv image is null, triggers an update to fetch latest cv
   */
  const showCV = async () => {
    //toggle visibility of CV
    setCVEnabled(!cvEnabled);

    if (cvImage === null) {
    //if image is null, trigger update to fetch latest cv  
      updateCV(cvImage, handleCVImage);
    }
  }


  const [linkedin, setLinkedin] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  
  const getSocialMedia = async () => {
    if (linkedin !== '' && facebook !== '' && instagram !== '' && twitter !== '') {
      return;
    }
    try {
      const result = await axios.get("http://localhost:8080/api/socialmedia");
      console.log(result.data);
      setLinkedin(result.data.linkedin);
      setFacebook(result.data.facebook);
      setInstagram(result.data.instagram);
      setTwitter(result.data.twitter);
    } catch (error) {
      console.error('Error while downloading social media:', error);
    }
  }

  // Component for social media icons
  const SocialMediaIcon = ({ url, Icon }: { url: string, Icon:IconType }, ) => {
    return (
      <Button variant="link" onClick={() => window.open(url, '_blank')} id="social-media" className="mt-3" style={{ color: 'inherit' }}>
        <IconContext.Provider value={{ className: "social-media-icon" }}>
          <Icon id="social-media-icon" />
        </IconContext.Provider>
      </Button>
    );  
  };

  return (
    //container holding the entire content of the page
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
                    
                      <SocialMediaIcon url={facebook} Icon={FaFacebook} />
                    
                      <SocialMediaIcon url={instagram} Icon={FaInstagram} />
                    
                      <SocialMediaIcon url={linkedin} Icon={FaLinkedin} />
                    
                      <SocialMediaIcon url={twitter} Icon={FaTwitter} />
                    
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

/**
 * updates the cv image by fetching latest cv data from server
 * 
 * @param cvImage - the current CV image
 */
export async function updateCV(cvImage: any, handleCVImage: (cvImage: CV) => void){
  try {
    if (cvImage === null) {
      //fetch the latest cv data from server
      const result = await axios.get<CV>("http://localhost:8080/api/cv");
      //update cv image using provided callback func
      handleCVImage(result.data);
      //log the retrieved cv data
      console.log('CV:', result.data);
    }
    
   //console.log('CV filename:', result.data.image)
   //Log type of data:
   //console.log('Type of data:', typeof result.data?.image);
  } 
  catch (error) {
    //handles errors that occur during the update process
    console.error('Error while downloading the cv:', error);
  }
};



export default MainContent;