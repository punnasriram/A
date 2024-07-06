import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/Folder.css';
import { Link } from 'react-router-dom';

export default function Folder() {
  const [openFolders, setOpenFolders] = useState({});
  const [folderFiles, setFolderFiles] = useState({});

  const folders = ['Exam', 'Sports', 'Events', 'Holidays', 'Other'];

  const fetchFolderData = async (folder) => {
    try {
      const response = await axios.get(`http://localhost:5000/get-${folder.toLowerCase()}Files`);
      setFolderFiles((prevState) => ({
        ...prevState,
        [folder]: response.data.data,
      }));
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const fetchAllFoldersData = () => {
    folders.forEach((folder) => {
      fetchFolderData(folder);
    });
  };

  const handleFolderClick = (folder) => {
    setOpenFolders((prevState) => ({
      ...prevState,
      [folder]: !prevState[folder],
    }));
  };

  const handleFileClick = (fileName) => {
    window.open(`http://localhost:5000/files/${fileName}`, '_blank');
  };

  useEffect(() => {
    fetchAllFoldersData(); // Assuming fetchAllFoldersData is a function
}, [fetchAllFoldersData]); // Include fetchAllFoldersData in the dependency array

  return (
    <>
      <header className="App-header">
      <h1>Auto File Segregator</h1>
     <Link to="/"><button className="btn">Logout</button></Link> 
    </header><hr/>
     <div className="">
     <h2>Folders</h2>
        <div className="main-content">
          <div className="folders-section">
            <div className="folders">
              {folders.map((folder) => (
                <div key={folder}>
                <div className='straight'>
                <div className="folder" onClick={() => handleFolderClick(folder)}>
                  📁
                  <p>{folder}</p>
                </div>
                {openFolders[folder] && (
                  <div className="files">
                    {folderFiles[folder] && folderFiles[folder].map((file) => (
                      <div key={file._id} className="file" onClick={() => handleFileClick(file.pdf)}>
                        🗃️
                        <p>{file.title}</p>
                      </div>
                    ))}
                  </div>
                )}
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
    </div>
    </>
  )
}
