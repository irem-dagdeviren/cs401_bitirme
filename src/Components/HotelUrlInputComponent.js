import React, { useState } from 'react';

const HotelUrlInputComponenet = ({ inputValue, setInputValue, onInputChange }) => {
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        onInputChange(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        buttonClicked ? setButtonClicked(false) : setButtonClicked(true);
    };

    return (
        <form onSubmit={handleSubmit} className="my-4 p-4 rounded shadow" style={{ backgroundColor: '#f0f8ff' }}>
            <div className="mb-3">
                <strong htmlFor="hotelUrl" className="form-label">Hotel URL:</strong>
                <input
                    type="text"
                    className="form-control"
                    id="hotelUrl"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter Hotel URL"
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            {buttonClicked && <label className="mt-3 d-block">You entered: {inputValue}</label>}
        </form>
    );
};

export default HotelUrlInputComponenet;