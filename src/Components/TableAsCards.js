import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryCard = ({ category, subcategories }) => (
    <div className="card mb-4 shadow" style={{ backgroundColor: '#f0f8ff', borderColor: '#f5c6cb' }}>
        <div className="card-body">
            <h5 className="card-title text-danger">{category}</h5>
            <ul className="list-group list-group-flush">
                {subcategories.map((subcategory, index) => (
                    <li key={index} className="list-group-item">
                        <strong className="text-primary">{subcategory[0]}:</strong> <strong className="text-success">Score:</strong> {parseFloat(subcategory[1])}

                    </li>
                ))}
                <strong>Total Point in this category: {subcategories.reduce((total, subcategory) => total + parseFloat(subcategory[1]), 0).toFixed(2)}</strong>
            </ul>
        </div>
    </div>
);

const TableAsCards = ({ data }) => (
    <div className="card-deck">
        {Object.keys(data).map((category, index) => (
            <CategoryCard
                key={index}
                category={category}
                subcategories={data[category]}
            />
        ))}
    </div>
);

export default TableAsCards;
