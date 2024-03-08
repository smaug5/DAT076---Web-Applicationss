
import { useState } from 'react';
import { Form, Button, Container, FormLabel, FormControl } from 'react-bootstrap';
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

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
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
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', delTitle);
    console.log('Deleting project' + delTitle);

    try {
      const response = await axios.delete('http://localhost:8080/api/project')
      .then(response => {
        console.log('Deleted project with name: ' + formData);
      });

      alert('Project deleted successfully!');


      // Clear form:
      /*
      setDelTitle('');
      */
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Project delete failed');

    }
  };

// Functions and variables to handle CV upload --------------------------------------------------------------
  const [selectedCVFile, setSelectedCVFile] = useState(null);

  const handleFileChange = (event: {target: any; preventDefault: () => void; }) => {
    event.preventDefault();
    setSelectedCVFile(event.target.files[0]);
  };

  const handleCVSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!selectedCVFile) {
      alert('Please select a file first!');
      return;
    }
    const formData = new FormData();
    formData.append('cv', selectedCVFile);

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

  return (
    <Container>

      {/* Form to add project */}
      <Form onSubmit={handleSubmit}>
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

      {/* Form to delete project */}

      <Form onSubmit={handleDelete}>
        <Form.Group className="mb-3" controlId ="formDeleteTitle">
        <Form.Label>Delete Project</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title of project to delete"
          value={delTitle}
          onChange={(e) => setDelTitle(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" id="CV-button">
          Submit
        </Button>
      </Form>

      <br></br>

      {/* Form to upload CV*/}

      <Form onSubmit={handleCVSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select CV file (PDF only)</Form.Label>
          <Form.Control type="file" accept=".pdf" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Upload CV
        </Button>
      </Form>

      

    </Container>
  );
  }

  

export default AdminManagerPage;