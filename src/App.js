import React, { useState, useEffect } from 'react';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [jsonData, setJsonData] = useState({});

  useEffect(() => {
    // Fetch data from Flask API '/get_data' endpoint
    fetch('http://localhost:5000/get_data')
      .then(response => response.json())
      .then(data => setData(data.data))
      .catch(error => console.error('Error fetching data:', error));

    // Fetch data from Flask API '/get_table' endpoint
    fetch('http://localhost:5000/get_table')
      .then(response => response.json())
      .then(data => setJsonData(JSON.parse(data)))
      .catch(error => console.error('Error fetching JSON data:', error));
  }, []);

  console.log(jsonData);
  return (
    <div>
      <h2>Data from Flask API:</h2>
      <p>{data}</p>

      <h2>JSON Object as a Table:</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(jsonData).map((category) => (
            jsonData[category].map(([subcategory, score]) => (
              <tr key={subcategory}>
                <td>{category}</td>
                <td>{subcategory}</td>
                <td>{score}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
