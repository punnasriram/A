import React, { useState } from 'react';
import axios from 'axios';
import './Main.css';
import { Link } from 'react-router-dom';
import folderImage from '../components/main.jpg'; 

function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleFileNameChange =(e)=>{
    setFileName(e.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', fileName);

    try {
      await axios.post('http://localhost:5000/upload-files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully');
    } catch (error) {
      setMessage('File upload failed: ' + error);
    }
  };

  return (
    <>
      <header className="App-header">
      <h1>Auto File Segregator</h1>
      <Link to="/"><button className="btn btn1">Logout</button> </Link>
    </header><hr/>
    <div className="Main">
      <div className="container1">
        <div className="file-upload">
          <form onSubmit={handleSubmit} >
            <p>Drop files here</p>
            <p>Supported form: PNG, JPG</p>
            <input type="file" onChange={handleFileChange} />
            <label>File name:</label>
            <input type='text' value={fileName} onChange={handleFileNameChange}/>
            <button type="submit" className='upload'>Upload</button>
          </form>
          {message && <p>{message}</p>}
        </div>
        <div className="folders">
          <img src={folderImage} alt="Folders" className='img'/>
         <Link to="/folder"><button className='btn'>Folder</button></Link> 
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
