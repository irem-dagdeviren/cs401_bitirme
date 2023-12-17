import React from 'react';
import Card from 'react-bootstrap/Card';

class HotelCard extends React.Component {
    render() {
        const { userInput, onClose } = this.props;

        return (
            <Card className="hotel-card">
                <Card.Body>
                    <Card.Title>Hotel Information</Card.Title>
                    <Card.Text>
                        <p>User Input: {userInput}</p>
                        {/* Add more hotel information here */}
                    </Card.Text>
                    <button onClick={onClose}>Close</button>
                </Card.Body>
            </Card>
        );
    }
}

export default HotelCard;
