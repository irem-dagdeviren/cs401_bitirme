import React, { useState } from 'react';

const HotelUrlInputComponenet = ({ onInputChange }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        onInputChange(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Hotel URL:
                <input type="text" value={inputValue} onChange={handleInputChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
};
export default HotelUrlInputComponenet;