import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./ProfileScreen.css";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();
  const [allergy, setAllergy] = useState("");
  const [diet, setDiet] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
      setAllergy(userInfo.allergy);
      setDiet(userInfo.diet);
    }
  }, [navigate, userInfo]);

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please select an image!");
    }
    setPicMessage(null);

    if (pics.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "DinDer");
      data.append("cloud_name", "dinderusers");
      fetch("https://api.cloudinary.com/v1_1/dinderusers/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an image!");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password === confirmPassword)
      dispatch(updateProfile({ name, email, password, pic, allergy, diet }));
  };

  return (
    <MainScreen title="Edit Profile">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully!
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <div className="nameinput">
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>
              <div className="emailinput">
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>
              <div className="passwordinput">
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>
              <div className="confirmpasswordinput">
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>{" "}
              </div>
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <div className="picupload">
                <Form.Group controlId="pic">
                  <Form.Label>Change Profile Picture</Form.Label>
                  <Form.Control
                    onChange={(e) => postDetails(e.target.files[0])}
                    id="custom-file"
                    type="file"
                    label="Upload Profile Picture"
                    accept="image/*"
                  />
                </Form.Group>
              </div>
              <div className="allergyinput">
                <Form.Group controlId="allergybox">
                  <Form.Label>I am allergic to...</Form.Label>
                  <Form.Control
                    type="allergy"
                    placeholder="Any allergies? e.g. Fish, Milk..."
                    value={allergy}
                    onChange={(e) => setAllergy(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>
              <div className="dietinput">
                <Form.Group controlId="dietbox">
                  <Form.Label>My diet is...</Form.Label>
                  <Form.Control
                    type="diet"
                    placeholder="Do you have a particular diet? e.g. Vegetarian"
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>

              <div className="updatebutton">
                <Button type="submit" variant="secondary">
                  Update
                </Button>
              </div>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
