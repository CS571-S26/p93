import '../App.css'
import "../styles/yourlist.css"
import { Container } from 'react-bootstrap';
import { useState } from "react";

export default function YourListPage() {

  const [favorites, setFavorites] = useState([]);

  return (
    <Container style={{padding: 40, display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h1 style={{marginBottom: 40}}> Your List</h1>
        <Container className="yourListContainer">
          {
            favorites.length === 0 ? <p> You have no favorited internships at this time. </p> : <></>
          }
        </Container>
    </Container>
  )
}