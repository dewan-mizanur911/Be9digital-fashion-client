import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import AboutItem from "../AboutItem/AboutItem";
import "./About.css";

const About = () => {
  const [about, setAbout] = useState({});
  useEffect(() => {
    fetch("https://be9digital-market.herokuapp.com/about")
      .then((res) => res.json())
      .then((data) => setAbout(data));
  }, []);

  return (
    <Container
      fluid
      id="about"
      style={{ backgroundColor: "#394650" }}
      className="px-4 py-3 rounded"
    >
      <h2 className="mb-2 fw-bold">
        <span className="text-white">About</span>{" "}
        <span className="color-orrange">Us</span>
      </h2>
      <div className="divider bg-info rounded mb-3 mx-auto"></div>
      <div className="line mx-auto mb-3"></div>
      <div className="break-line mx-auto mb-3"></div>
      {about.length ? (
        <Row xs={1} md={2} className="g-3 mb-5">
          {about.map((item) => (
            <AboutItem key={item.id} item={item}></AboutItem>
          ))}
        </Row>
      ) : (
        <Spinner className="my-5" animation="border" variant="light" />
      )}
      <div className="divider bg-info rounded my-3 mx-auto"></div>
    </Container>
  );
};

export default About;