import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Intro from './components/Intro';
import SignIn from './components/Signin';
import Signup from './components/Signup';
import Main from './components/Main';
import Folder from './components/Folder';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main/>}/>
        <Route path="/folder" element={<Folder/>}/>
      </Routes>
    </Router>
  );
}
