import { Form, Container, Button, Row, Col } from 'react-bootstrap'
import { useState, useRef, useContext } from 'react';
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

  function handleLogin(type) {

    if (type === "old") {

      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((cred) => {
        console.log("Logged in: " + cred.user.uid);
      }).catch((err) => {
        console.error(err);
        alert(err.message);
      });

    } else {

      if (password.current.value < 6 || repeatPassword.current.value.length < 6){
        alert("Passwords must be at least 6 characters!");
      } else if (password.current.value !== repeatPassword.current.value) {
        alert("Passwords do not match!");
      }
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value, repeatPassword.current.value)
      .then((cred) => {
        console.log("User Created: " + cred.user.uid);
      }).catch((err) => {
        console.error(err);
        alert(err.message);
      });

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