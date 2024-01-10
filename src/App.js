import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TableAsCards from './Components/TableAsCards';
import HotelUrlInputComponenet from './Components/HotelUrlInputComponent';
import ShowResultComponent from './Components/ShowResultComponent';
import { RingLoader } from 'react-spinners';



const ErrorDisplay = ({ error }) => <div className="error">Error: {error.message}</div>;


const DataTable = () => {
  const [data, setData] = useState([]);
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');


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
      <HotelUrlInputComponenet
        inputValue={inputValue}
        setInputValue={setInputValue}

      />

      {/* gelen input value yu python koduna gönder  */}
      <div>
        {/* <ShowResultComponent data={data} />
        <h2>Details:</h2> */}
        {loading &&
          <RingLoader css={'display: block; margin: 0 auto;'} size={150} color={'#36D7B7'} loading={loading} />
        }
        {error && <ErrorDisplay error={error} />}
        {!loading && !error && (
          <div>
            <ShowResultComponent data={data} />
            <h2>Details:</h2>
            <TableAsCards data={jsonData} />
          </div>
        )}
      </div>

    </div>
  );
};


export default DataTable;
