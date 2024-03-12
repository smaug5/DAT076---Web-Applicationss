
import { useState } from 'react';
import { Form, Button, Row, Container, FormLabel, FormControl } from 'react-bootstrap';
import '../App.css';
import '../../src/css/main.css';
import '../../src/css/animations.css';
import axios from 'axios';


export function AdminManagerPage() {

  // Functions and variables to handle project adding ---------------------------------------------------------
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleProjectSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!authorised) {
      alert('Please authorise first!');
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('url', url);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    console.log('Submitting form with form data: \n')
    for (let [key, value] of formData.entries()) { //This shows the each form data entry thing
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.put('http://localhost:8080/api/project', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Project added successfully!');
      console.log('Put request successfully sent and received! Data received: \n');
      console.log(response.data);
    
      // Clear form here:
      /*
      setTitle('');
      setUrl('');
      setDescription('');
      setImage(null);*/


    } catch (error) {
      console.error('Error submitting form:', error);
      console.log("Res status: " + error)
      console.log(typeof error);
      
      if (error == new Error("AxiosError: Request failed with status code 400")) {
        return alert('Duplicate projects');
      }

      alert('Error adding project');

      // Handle error here, set an error message on website
    }
  };

  const handleImageChange = (event: {target: any; preventDefault: () => void; }) => {
    event.preventDefault();
    setImage(event.target.files[0]);
  };

// Functions and variable to handle Project deletion ---------------------------------------------------------
  const [delTitle, setDelTitle] = useState('');
  const handleDelete = async (event: { preventDefault: () => void; }) => {
    console.log("Entered handleDelete()")
    event.preventDefault();
    if (!authorised) {
      alert('Please authorise first!');
      return;
    }
    const formData = new FormData();
    formData.append('title', delTitle);
    console.log('Deleting project' + delTitle);
    try {
      const response = await axios.delete('http://localhost:8080/api/project/' + delTitle)
      .then(response => {
        console.log('Deleted project with name: ' + formData);
      });
      console.log(response);
      alert('Project deleted successfully!');
      // Clear form:
      /*
      setDelTitle('');
      */
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error deleting project');
    }
  };

// Functions and variables to handle CV upload ---------------------------------------------------------------
  const [selectedCVFile, setSelectedCVFile] = useState(null);
  
  const handleCVChange = (event: {target: any; preventDefault: () => void; }) => {
    event.preventDefault();
    setSelectedCVFile(event.target.files[0]);
  };

  const handleCVSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!selectedCVFile) {
      alert('Please select a file first!');
      return;
    }
    if (!authorised) {
      alert('Please authorise first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedCVFile);

    try {
      const response = await axios.put('http://localhost:8080/api/cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully', response.data);
      alert('CV uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file', error);
      alert('Error uploading CV');
    }
  };

  // Variables to handle authorisation -----------------------------------------------------------------------
  const [password, setPassword] = useState('');
  const [newPassword, setnewPassword] = useState('')
  const [authorised, setAuthorised] = useState(false);

  const handleAutorisatiion = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log('Authorising with password: ' + password);
    const authPassword = new FormData();
    authPassword.append('password', password);
    try {
      const response = await axios.post('http://localhost:8080/api/login', authPassword, {
        headers: {
          'Content-Type': 'application/json',
      },
    }); 
      console.log("Password is: ", response.data)
      setAuthorised(response.data);
      if (response.data) {
        alert('Authorisation successful. You are now authorised to make changes to the portfolio');
      }
    } catch (error) {
      setAuthorised(false);
      console.error('Error retrieving password:', error);
      alert('Could not authorise user. Please try again.');
    }
  };


  const changePassword = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    /*if (!authorised){
      alert('Please autorise before changing the password')
      return
    }*/
    const formData = new FormData();
    formData.append('newPassword', newPassword);
    console.log('Adminpage: Changing password to: ' + newPassword);
    try {
      const response = await axios.post('http://localhost:8080/api/login/changePassword', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
    });
      alert('Password changed successfully to: ' + newPassword);
      window.location.reload();
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password');
    }
  }


  // Main body -----------------------------------------------------------------------------------------

  return (
    <Container className="admin-text">
      <br></br>
      <div id="center-text-div">
        <h1 className="center-text">Admin Manager</h1>
      </div>
      <br></br>
      <br></br>
      <Row>
        {authorised && <Container className="left-half">
          {/* Form to add project */}
          <h2>Add Project</h2>
          <Form onSubmit={handleProjectSubmit}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUrl">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter project URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Project Image (optional)</Form.Label>
              <Form.Control type="file" accept=".png" onChange={handleImageChange} />
            </Form.Group>

            <Button variant="primary" type="submit" id="CV-button">
              Submit
            </Button>
          </Form>

          <br></br>
          <br></br>
          <h2>Delete Project</h2>

          {/* Form to delete project */}

          <Form onSubmit={handleDelete} className="maxWidth">
            <Form.Group className="mb-3" controlId ="formDeleteTitle">
            <Form.Label>Project Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title of project to delete"
              value={delTitle}
              onChange={(e) => setDelTitle(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" id="CV-button">
              Delete
            </Button>
          </Form>

          <br></br>

          {/* Form to upload CV*/}
          <h2>Upload CV</h2>
          <Form onSubmit={handleCVSubmit}>
            <Form.Group controlId="formfile" className="mb-3">
              <Form.Label>Select CV file (png only)</Form.Label>
              <Form.Control type="file" accept=".png" onChange={handleCVChange} />
            </Form.Group>
            <Button variant="primary" type="submit" id="CV-button">
              Upload CV
            </Button>
          </Form>

        </Container>}
        <Container className="right-half">
          <h2>Authorisation</h2>
          <Form onSubmit={handleAutorisatiion}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" id="CV-button">
              Authorize
            </Button>
          </Form>

          <br></br>

          {authorised && <h2>Change Password</h2>}
          {authorised && <Form onSubmit={changePassword}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" id="CV-button">
              Change Password
            </Button>
          </Form>}
        </Container>
      </Row>
    </Container>
  );
  }

  

export default AdminManagerPage;