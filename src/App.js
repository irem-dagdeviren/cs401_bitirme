// // App.js
// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useState } from 'react';
import './App.css';
import { BeatLoader } from 'react-spinners';

// import HotelCard from './Components/HotelCard';

// function App() {
//   const [userInput, setUserInput] = useState('');
//   const [cards, setCards] = useState([]);
//   const [result, setResult] = useState('');


//   const handleInputChange = (event) => {
//     setUserInput(event.target.value);
//   }

//   const handleButtonClick = () => {
//     const newCard = {
//       id: Date.now(),
//       userInput: userInput,
//     };

//     setCards([...cards, newCard]);
//     setUserInput('');
//   }

//   const handleCloseCard = (id) => {
//     const updatedCards = cards.filter(card => card.id !== id);
//     setCards(updatedCards);
//   }

//   return (
//     <div>
//       <h1>Welcome to the Hotel Assessment Tool</h1>
//       <input type="text" value={userInput} onChange={handleInputChange} />
//       <button onClick={handleButtonClick}>Submit</button>

//       {cards.map(card => (
//         <HotelCard
//           key={card.id}
//           card={card}
//           onClose={() => handleCloseCard(card.id)}
//           onCardClose={() => setUserInput('')} // Callback to clear userInput in App component
//         />
//       ))}
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';



const App = () => {
  const [urlInput, setUrlInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state


  const handleUrlChange = (e) => {
    setUrlInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/get_result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urlInput }),
      });
      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const resultData = await response.json();
      setResult(resultData.result);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setResult('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }

  };
  const renderTable = () => {
    if (!result) {
      return null;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Values</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(result).map(([category, values]) => (
            <tr key={category}>
              <td>{category}</td>
              <td>
                <ul>
                  {Array.from(values).map(([name, value]) => (
                    <li key={name}>
                      {name}: {value}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <label>
          URL:
          <input type="text" value={urlInput} onChange={handleUrlChange} className="input" />
        </label>
        <button type="submit" className="button">Submit</button>
      </form>

      {loading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <BeatLoader color="#36D7B7" size={15} />
        </div>
      )}

      {result && (
        <div>
          <h2>Result:</h2>
          <pre>{result}</pre>
          {renderTable()}

        </div>
      )}
    </div>
  );
};

export default App;
