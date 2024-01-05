import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './App.css';

const LoadingIndicator = () => <div className="loading">Loading...</div>;

const ErrorDisplay = ({ error }) => <div className="error">Error: {error.message}</div>;

const TableComponent = ({ data }) => (
  <div className='table-responsive'>
    <h2>Data Table</h2>
    <table className="table table-bordered table-striped">
      <thead className="thead-dark">
        <tr>
          <th>Category</th>
          <th>Subcategory</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((category) =>
          data[category].map((subcategoryArray, index) => (
            <tr key={index}>
              <td>{category}</td>
              <td>{subcategoryArray[0]}</td>
              <td>{subcategoryArray[1]}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

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

  return (
    <div>
      <h2>Data from Flask API:</h2>
      {loading && <LoadingIndicator />}
      {error && <ErrorDisplay error={error} />}
      {!loading && !error && (
        <div>
          <TableComponent data={jsonData} />
        </div>
      )}
    </div>
  );
};

export default DataTable;
