
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../App.css';
import '../../src/css/main.css';
import '../../src/css/animations.css';
import translateIcon from '../../src/images/translate_icon.svg';
import itGirlImage from '../../src/images/IT-girl.jpg';
import axios from 'axios';
import { log } from 'console';


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

    try {
      const response = await axios.put('', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success!');
      console.log(response.data);
      // Handle response here, clear form etc
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
          <Form.Label>Project Image (optional)</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
  }

  

export default AdminManagerPage;