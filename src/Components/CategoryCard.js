import React from 'react';
import { Card, ListGroup } from 'react-bootstrap'; // Import Bootstrap components for styling

const CategoryCard = ({ category, subcategories }) => {
    const total = subcategories.reduce((total, subcategory) => total + parseFloat(subcategory[1]), 0);
    const cardStyle = {
        backgroundColor: total === 0 ? '#c21807' : '#f0f8ff',
        borderColor: '#f5c6cb',
    };
    return (
        <Card className="shadow-sm mb-4" style={cardStyle} >
            <Card.Header className="bg-primary text-white">{category}</Card.Header>
            <ListGroup variant="flush">
                {subcategories.map((subcategory, index) => (
                    <ListGroup.Item key={index}>
                        <strong>{subcategory[0]}:</strong> {subcategory[1]}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    );
};

export default CategoryCard;
