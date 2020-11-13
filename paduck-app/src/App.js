import React, { useEffect }  from 'react';
import logo from './logo.svg';
import './App.css';
//import wallpaper from 'wallpaper'
const fs = window.require('fs');

import childProcess from 'child_process'
import pify from 'pify'
const setWallpaper = async() => {
 // await wallpaper.set('b.jpg')
}

const execFile = pify(childProcess.execFile)

function App() {
  useEffect(()=>{
    execFile('./wallpaper.exe', ['./b.jpg'])
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
