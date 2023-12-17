import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './App.css';
import HotelCard from './Components/HotelCard';

function App() {
  const [userInput, setUserInput] = useState('');
  const [showCard, setShowCard] = useState(false);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  }

  const handleButtonClick = () => {
    setShowCard(true);
  }

  const handleCloseCard = () => {
    setShowCard(false);
    setUserInput('');
  }

  return (
    <div>
      <h1>Welcome to the Hotel Assessment Tool</h1>
      <input type="text" value={userInput} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Submit</button>

      {showCard && (
        <HotelCard userInput={userInput} onClose={handleCloseCard} />
      )}
    </div>
  );
}

export default App;
