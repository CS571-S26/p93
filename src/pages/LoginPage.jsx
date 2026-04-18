import { Form, Container, Button, Row, Col } from 'react-bootstrap'
import { useState, useRef, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/login.css"
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import AuthContext from "../AuthContext";

export default function LoginPage() {

  const [newUser, setNewUser] = useState(false);

  const email = useRef();
  const password = useRef();
  const repeatPassword = useRef();
  
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogin(type) {

    if (type === "old") {

      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((cred) => {
        navigate("/resume");

      }).catch((err) => {
        console.log(err);
        if (err.code === "auth/invalid-credential") 
          alert("Your email or password are incorrect.");
        else
          alert("Error logging in. Please check username and password.");
        
      });

    } else {

      if (password.current.value.length < 6 || repeatPassword.current.value.length < 6){
        alert("Passwords must be at least 6 characters!");
      } else if (password.current.value !== repeatPassword.current.value) {
        alert("Passwords do not match!");
      } else {
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((cred) => {
          navigate("/yourlist");
        }).catch((err) => {
          if (err.code === "auth/email-already-in-use") 
            alert("Email already in use! Try again with a different email!");
          else if (err.code === "auth/invalid-email")
            alert("Invalid email format!");
          else 
            alert("Sign up failed. Please try again later.");
        });
      }
    }
  }

  return (
    <div>
      <Container className="loginContainer">
        <h1> Login </h1>
      </Container>
      {
        !newUser ? 
        <Container> 
          <Row className="loginRow">
            <Form.Label>Enter Email</Form.Label>
            <Form.Control ref={email}></Form.Control>
          </Row>
          <Row className="loginRow">
            <Form.Label >Enter Password</Form.Label>
            <Form.Control type="password" ref={password}></Form.Control>
          </Row>
          <Row className="loginRow">
            <Col>
              <Button onClick={() => handleLogin("old")}> Login</Button>
            </Col>
            <p onClick={() => setNewUser(true)} className="switchLoginMode"> New User? </p>
          </Row>
        </Container> : 
      <Container> 
        <Row className="loginRow" >
          <Form.Label> Enter Email </Form.Label>
          <Form.Control ref={email}></Form.Control>
        </Row>
        <Row className="loginRow">
          <Form.Label> Create Password</Form.Label>
          <Form.Control type="password" ref={password}></Form.Control>
        </Row>
        <Row className="loginRow ">
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control type="password" ref={repeatPassword}></Form.Control>
        </Row>
        <Row className="loginRow">
          <Col>
            <Button onClick={() => handleLogin("new")}> Create & Login</Button>
          </Col>
          <p onClick={() => setNewUser(false)} className="switchLoginMode"> Returning User? </p>
        </Row>
        
      </Container>
    }
    </div>
      
     
  )
}