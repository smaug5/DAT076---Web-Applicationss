
import { useState } from 'react';
import { Form, Button, Container, FormLabel, FormControl } from 'react-bootstrap';
import '../App.css';
import '../../src/css/main.css';
import '../../src/css/animations.css';
import axios from 'axios';


export function AdminManagerPage() {
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
      // Handle error here, set an error message on website
    }
  };

  const handleImageChange = (event: {
    target: any; preventDefault: () => void; 
}) => {
    event.preventDefault();
    setImage(event.target.files[0]);
  };

  const [delTitle, setDelTitle] = useState('');

  const handleDelete = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', delTitle);
    console.log('Deleting project' + delTitle);

    try {
      const response = await axios.delete('http://localhost:8080/api/project')
      .then(response => {
        console.log('Deleted project with name: ' + ´formData);
      });

      // Clear form:
      /*
      setDelTitle('');
      */
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
<<<<<<< Updated upstream
  

};
=======
  };
>>>>>>> Stashed changes

  

  return (
    <Container>
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
          <Form.Label>Project Image of type .PNG (optional)</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>

        <Button variant="primary" type="submit" id="CV-button">
          Submit
        </Button>
      </Form>

      <Form onSubmit={handleDelete}>
        <Form.Group className="mb-3" controlId ="formDeleteTitle">
        <Form.Label>Title of project</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter project to delete"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" id="CV-button">
          Submit
        </Button>
      </Form>
    </Container>
  );
  }

  

export default AdminManagerPage;