import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./RegisterScreen.css";
import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
//import AutoComplete from "../../components/AutoComplete/AutoComplete";

const RegisterScreen = () => {
  //const options = [
  //{ value: "dairy", label: "Dairy" },
  //{ value: "eggs", label: "Eggs" },
  //{ value: "fish", label: "Fish" },
  //{ value: "milk", label: "Milk" },
  //{ value: "peanuts", label: "Peanuts" },
  //{ value: "sesame", label: "Sesame" },
  //{ value: "shellfish", label: "Shellfish" },
  //{ value: "soy", label: "Soy" },
  //{ value: "treenuts", label: "Treenuts" },
  //{ value: "wheat", label: "Wheat" },
  //];

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [allergy, setAllergy] = useState("");
  const [diet, setDiet] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/myrecipes");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords do not match!");
    } else {
      dispatch(register(name, email, password, pic, allergy, diet));
    }
  };

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

  return (
    <MainScreen title="Register">
      <div className="loginContainer">
        <Row>
          <Col md={6}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {loading && <Loading />}
            <Form onSubmit={submitHandler}>
              <div className="nameinput">
                <Form.Group controlId="name">
                  <Form.Label class="control-label">Name</Form.Label>
                  <Form.Control
                    type="name"
                    value={name}
                    placeholder="Enter name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </div>

              <div className="emailinput">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label class="control-label2">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </div>

              <div className="passwordinput">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label class="control-label3">Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </div>

              <div className="confirmpasswordinput">
                <Form.Group controlId="confirmPassword">
                  <Form.Label class="control-label4">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmpassword}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
              </div>

              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <div className="picupload">
                <Form.Group controlId="pic">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    onChange={(e) => postDetails(e.target.files[0])}
                    id="custom-file"
                    type="file"
                    label="Upload Profile Picture"
                    accept="image/*"
                  />
                </Form.Group>
              </div>

              <div className="preferencestitle">
                <h6>My Preferences...</h6>
              </div>

              <div className="allergyinput">
                <Form.Group controlId="allergybox">
                  <Form.Label>Any allergies?</Form.Label>
                  {/*<AutoComplete
                    suggestions={[
                      "Dairy",
                      "Eggs",
                      "Fish",
                      "Milk",
                      "Peanuts",
                      "Sesame",
                      "Shellfish",
                      "Soy",
                      "Treenuts",
                      "Wheat",
                    ]}
                  />*/}

                  <Form.Control
                    type="allergy"
                    value={allergy}
                    placeholder="e.g. Fish, Milk,..."
                    onChange={(e) => setAllergy(e.target.value)}
                  />

                  <div className="allergylabel">
                    <Form.Label>
                      For example: Diary, Eggs, Fish, Milk, Peanuts, Sesame,
                      Shellfish, Soy, TreeNuts, Wheat...
                    </Form.Label>
                  </div>
                </Form.Group>
              </div>

              <div className="dietinput">
                <Form.Group controlId="dietbox">
                  <Form.Label>Do you have a particular diet?</Form.Label>
                  {/*<AutoComplete
                    suggestions={[
                      "Dairy-Free",
                      "Gluten-Free",
                      "Vegetarian",
                      "Vegan",
                      "Kosher",
                      "Paleo",
                      "Pescatarian",
                      "Halal",
                    ]}
                  />*/}

                  <Form.Control
                    type="diet"
                    value={diet}
                    placeholder="e.g. Vegetarian"
                    onChange={(e) => setDiet(e.target.value)}
                  />

                  <div className="dietlabel">
                    <Form.Label>
                      For Example: Dairy-Free, Gluten-Free, Vegetarian, Vegan,
                      Kosher, Paleo, Pescatarian, Halal...
                    </Form.Label>
                  </div>
                </Form.Group>
              </div>

              <div className="registerbutton">
                <Button variant="primary" type="submit">
                  Register
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

        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
