import React, { useState } from 'react';

const HotelUrlInputComponenet = ({ inputValue, setInputValue, buttonClicked, setButtonClicked }) => {

    const handleInputChange = (event) => {
        if (!buttonClicked) {
            setInputValue(event.target.value);
            setButtonClicked(false);

        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setButtonClicked(true);
    };

    return (
        <form onSubmit={handleSubmit} className="my-4 p-4 rounded shadow" style={{ backgroundColor: '#f0f8ff' }}>
            <div className="mb-3">
                <strong htmlFor="hotelUrl" className="form-label">Hotel URL:</strong>
                <input
                    type="text"
                    className="form-control"
                    id="hotelUrl"
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