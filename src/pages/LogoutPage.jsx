import '../App.css';
import { Button, Container } from 'react-bootstrap';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';

export default function LogOutPage() {

  const navigate = useNavigate();

  function handleLogout() {
    signOut(auth)
    .then(() => {
        console.log("Logged out");
        navigate("/");

    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <Container style={{display:"flex", flexDirection:"column", paddingTop: 50, alignItems: "center"}}>
      <h1 style={{margin: 50}}> Logout </h1>
      <Button onClick={handleLogout}> Logout</Button>
    </Container>
  )
}