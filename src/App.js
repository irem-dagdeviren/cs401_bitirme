// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './App.css';
import HotelCard from './Components/HotelCard';

function App() {
  const [userInput, setUserInput] = useState('');
  const [cards, setCards] = useState([]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  }

  const handleButtonClick = () => {
    const newCard = {
      id: Date.now(),
      userInput: userInput,
    };

    setCards([...cards, newCard]);
    setUserInput('');
  }

  const handleCloseCard = (id) => {
    const updatedCards = cards.filter(card => card.id !== id);
    setCards(updatedCards);
  }

  return (
    <div>
      <h1>Welcome to the Hotel Assessment Tool</h1>
      <input type="text" value={userInput} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Submit</button>

      {cards.map(card => (
        <HotelCard
          key={card.id}
          card={card}
          onClose={() => handleCloseCard(card.id)}
          onCardClose={() => setUserInput('')} // Callback to clear userInput in App component
        />
      ))}
    </div>
  );
}

export default App;
