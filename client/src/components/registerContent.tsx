import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    
    try {
      const response = await axios.post('http://localhost:8080/api/register', {
        username: username,
        password: password,
      }, {
        withCredentials: true,
      });
      
      console.log('Register successful! User:', response.data.user);

      // Clear form:
      /*
      setUsername('');
      setPassword('');
      */
      
      
    } catch (error) {
      console.error('Error submitting register:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}> Register Page
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register 
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterPage;
