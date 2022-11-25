import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/myrecipes");
    }
  }, [navigate]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">
                Welcome to{" "}
                <img
                  style={{ width: 45 + "%" }}
                  src="https://i.ibb.co/4gWQp5z/Logo.png"
                  alt="DinDer Logo"
                />
              </h1>
              <p className="subtitle">
                Swipe and discover the best options for your culinary desires!
              </p>
            </div>

            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingbutton" variant="secondary">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  size="lg"
                  className="landingbutton"
                  variant="outline-secondary"
                >
                  Register
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
