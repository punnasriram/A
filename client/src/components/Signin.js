import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Signin.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/auth', {
        email,
        password,
        role
      });
      if (response.data.status === 'Admin') {
        navigate('/main');
      } else {
        navigate('/folder');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className='main'>
      <div className="App">
      <div className="signin-container">
        <h1 className="signin-title">Sign in</h1>
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter your password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <select
              className="input-field"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            ><option value="" disabled>
            Role
          </option>
              <option>Admin</option>
              <option>User</option>
            </select>
          </div>
          <button className="signin-button" type="submit">Sign in</button>
          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
