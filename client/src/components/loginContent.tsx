// import React from "react";
// import '../../src/css/login.css';


// export default function () { //props
//     return (
//         <div className="Auth-form-container">
//             <form className="Auth-form">
//                 <div className="Auth-form-content">
//                     <h3 className="Auth-form-title">Admin login</h3>
//                     <div className="form-group mt-3">
//                         <label>Username</label>
//                         <input
//                         type="username"
//                         className="form-control mt-1"
//                         placeholder="Enter Username"
//                         />
//                     </div>
//                     <div className="form-group mt-3">
//                         <label>Password</label>
//                         <input
//                         type="password"
//                         className="form-control mt-1"
//                         placeholder="Enter password"
//                         />
//                     </div>
//                     <div className="d-grip gap-2 mt-3">
//                         <button type="submit" className="btn btn-primary">
//                             Login
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }

import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        username: username,
        password: password,
      }, {
        withCredentials: true,
      });
      
      console.log('Login successful! User:', response.data.user);

      // Clear form:
      /*
      setUsername('');
      setPassword('');
      */
      
      
    } catch (error) {
      console.error('Error submitting login:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
