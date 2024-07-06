import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      role,
    };

    try {
      const response = await axios.post('http://localhost:5000/signup', userData);
      console.log(response.data);
      navigate('/signin')
    } catch (error) {
      console.error('There was an error!', error);
    }
  };


  

  return (
    <div className='main'>
      <div className="App">
      <div className="form-container">
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="" disabled>
                Role
              </option>
              <option>Admin</option>
              <option>User</option>
            </select>
          </div>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
    </div>
  );
}
