import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Features.css';

const Features = () => {
    return (
        <Container className="mb-5">
            <h1 className="fw-bold mt-5">Core features for <span className="text-danger">Super</span> users</h1>
            <p className="text-secondary mb-5">Following reasons show advantages of adding Be9digital market to your lead pages, demos and checkouts</p>
            <Row xs={1} md={3} lg={4}>
                <Col>
                <Card className="p-3 digital-cart feature-card">
                    <Card.Body>
                    <span className="feature mb-5"><i className="fas fa-headset fs-2"></i></span>
                    <div>

                            <p className="fw-bold">Live support</p>
                            <p className="text-secondary">Realize importance of social proof in customer’s purchase decision.</p>

                    </div>
                    </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card className="p-3 digital-cart">
                    <Card.Body>
                    <span className="feature mb-5"><i className="far fa-credit-card fs-2"></i></span>
                    <div>

                            <p className="fw-bold">Secure transaction</p>
                            <p className="text-secondary">Realize importance of social proof in customer’s purchase decision.</p>

                    </div>
                    </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card className="p-3 digital-cart">
                    <Card.Body>
                    <span className="feature mb-5"><i className="fas fa-unlock-alt fs-2"></i></span>
                    <div>

                            <p className="fw-bold">Information security</p>
                            <p className="text-secondary">Realize importance of social proof in customer’s purchase decision.</p>

                    </div>
                    </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card className="p-3 digital-cart">
                    <Card.Body>
                    <span className="feature mb-5"><i className="fas fa-exclamation-triangle fs-2"></i></span>
                    <div>
                            <p className="fw-bold">Live support</p>
                            <p className="text-secondary">Realize importance of social proof in customer’s purchase decision.</p>
                    </div>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Features;