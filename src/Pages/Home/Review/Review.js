import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Rating from 'react-rating';
import './Review.css';

const Review = ({review}) => {
    const {name, rating, comment} = review;
    return (
        <Col className="px-3">
        <Card className="px-3 review-card">
            <Card.Body>
            <Card.Title>{name.slice(0,18)}</Card.Title>
            <div>

                    <div>
                        <p><small><Rating
                                initialRating={rating}
                                readonly
                                emptySymbol="far fa-star icon-color"
                                fullSymbol="fas fa-star icon-color"
                                />
                            </small>
                        </p>
                        <p title={comment}>{comment.slice(0,21)}...</p>
                </div>
            </div>
            </Card.Body>
        </Card>
        </Col>
    );
};

export default Review;