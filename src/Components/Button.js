import React, { useState } from 'react';
import axios from 'axios';
import CategoryCard from './CategoryCard'; // Import the CategoryCard component


const Button = () => {
    const [url, setUrl] = useState(''); // State to store the URL input
    const [total_value, setTotal_Value] = useState(null); // State to store the
    const [result, setResult] = useState(null); // State to store the result

    const handleChange = (event) => {
        setUrl(event.target.value); // Update the URL state with the input value
    };


    const handleClick = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/run-python-code?url=${encodeURIComponent(url)}`);
            const { total_value, updated_class_map_json } = response.data; // Destructure the response data
            setTotal_Value(total_value); // Set the double value in the state

            setResult(JSON.parse(updated_class_map_json));
        } catch (error) {
            console.error('Error executing Python code:', error);
        }
    };
    return (
        <div>

            <div class="input-group input-group-lg">
                <input type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" value={url} onChange={handleChange} placeholder="Enter URL" />

                <button type="button" class="btn btn-success" onClick={handleClick}>  GO! </button>
            </div>
            {total_value && <div className='score mt-3 p-3 border rounded'>
                <h2 className="font-weight-bold mb-0">Total Value:</h2>
                <span className="display-4">{total_value}</span>
            </div>}
            {result && (
                <div>
                    <h2>Grading Details:</h2>
                    <div className="card-deck">
                        {Object.keys(result).map((category, index) => (
                            <CategoryCard
                                key={index}
                                category={category}
                                subcategories={result[category]}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Button;
