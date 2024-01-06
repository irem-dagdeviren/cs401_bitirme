import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './App.css';
import TableAsCards from './Components/TableAsCards';
import HotelUrlInputComponenet from './Components/HotelUrlInputComponent';

const LoadingIndicator = () => <div className="loading">Loading...</div>;

const ErrorDisplay = ({ error }) => <div className="error">Error: {error.message}</div>;

// const HotelUrlInputComponenet = ({ setHotelUrl, setHotelName }) => {
//   const [inputValue, setInputValue] = useState('');

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setHotelUrl(inputValue);
//     setHotelName(inputValue.split('/')[4]);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Hotel URL:
//         <input type="text" value={inputValue} onChange={handleInputChange} />
//       </label>
//       <input type="submit" value="Submit" />
//     </form>
//   );
// };

// const CategoryCard = ({ category, subcategories }) => (
//   <div className="card">
//     <div className="card-body">
//       <h5 className="card-title">{category}</h5>
//       <ul>
//         {subcategories.map((subcategory, index) => (
//           <li key={index}>
//             <strong>Subcategory:</strong> {subcategory[0]}, <strong>Score:</strong> {subcategory[1]}
//           </li>
//         ))}
//       </ul>
//     </div>
//   </div>
// );

// const TableAsCards = ({ data }) => (
//   <div className="card-deck">
//     {Object.keys(data).map((category) => (
//       <CategoryCard
//         key={category}
//         category={category}
//         subcategories={data[category]}
//       />
//     ))}
//   </div>
// );

const DataTable = () => {
  const [data, setData] = useState([]);
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch('http://localhost:5000/get_data');
        const data = await response1.json();
        setData(data.data);

        const response2 = await fetch('http://localhost:5000/get_table');
        const jsonData = await response2.json();
        setJsonData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleInputChange = async (inputValue) => {
  }

  return (
    <div>
      <label>Hotel URL</label>
      <HotelUrlInputComponenet onInputChange={handleInputChange} />

      {/* gelen input value yu python koduna gönder  */}


      <h1>Total Point</h1>
      <h2>{data}</h2>
      <h2>Data from Flask API:</h2>
      {loading && <LoadingIndicator />}
      {error && <ErrorDisplay error={error} />}
      {!loading && !error && (
        <div>
          <TableAsCards data={jsonData} />
        </div>
      )}
    </div>
  );
};

export default DataTable;
