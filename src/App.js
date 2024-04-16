import React, {useState} from 'react';
import './App.css';
import SentenceList from './components/SentenceList';
import img from "./components/logo.jpg"
function App() {

  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={img} alt='logo'/>
        <h1>Welcome to Aavaaz!</h1>
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          {/* <option>Select Language</option> */}
          <option value="Spanish">Spanish</option>
          <option value="Tamil">Tamil</option>
          <option value="Hindi">Hindi</option>
          <option value="Gujarati">Gujarati</option>
        </select>
      </header>
      <SentenceList selectedLanguage={selectedLanguage}/>
    </div>
  );
}

export default App;
