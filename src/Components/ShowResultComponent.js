import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const ShowResultComponent = ({ data }) => (
    <div className="card mt-4 p-3 shadow" style={{ backgroundColor: '#f0f8ff', borderColor: '#c3e6cb' }}>
        <h5 className="card-title text-success">Result</h5>
        <p className="card-text">
            <strong>Your Result:</strong> {data}
        </p>
    </div>
);

export default ShowResultComponent;
