// HotelCard.js
import React from 'react';
import Card from 'react-bootstrap/Card';

class HotelCard extends React.Component {
    render() {
        const { card, onClose, onCardClose } = this.props;

        return (
            <Card className="hotel-card">
                <Card.Body>
                    <Card.Title>Hotel Information</Card.Title>
                    <Card.Text>
                        <p>User Input: {card.userInput}</p>
                        {/* Add more hotel information here */}
                    </Card.Text>
                    <button onClick={() => { onClose(); onCardClose(); }}>Close</button>
                </Card.Body>
            </Card>
        );
    }
}

export default HotelCard;
