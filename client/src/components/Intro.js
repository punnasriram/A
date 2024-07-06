import React from 'react';
import { Link } from 'react-router-dom';
import './Intro.css';
import folderIcon from './folder-icon.png'; 

export default function Intro() {
  return (
    <div className='main'>
    <div className="App">
      <div className="intro-container">
        <h1 className="intro-title">
          Auto File Segregator
          <img src={folderIcon} alt="Folder Icon" className="folder-icon" />
        </h1>
        <p className="intro-subtitle">Helps to reduce the work load</p>
        <Link to="/signin">
          <button className="get-started-btn">Get Started</button>
        </Link>
      </div>
    </div>
    </div>
  );
}
