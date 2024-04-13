import React from 'react';
import './App.css';
import SentenceList from './components/SentenceList';
import img from "./components/logo.jpg"
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={img} alt='logo'/>
        <h1>Welcome to Aavaaz!</h1>
      </header>
      <SentenceList />
    </div>
  );
}

export default App;
