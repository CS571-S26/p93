import '../App.css'
import { Container, Button } from 'react-bootstrap'

export default function ResumePage() {
  return (
    <div>
      <Container style={{padding: 50, display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h1> Résumé Details</h1>
      </Container>
      <Container>
        <p> School </p>
        <p> Graduation Date </p>
        <p> GPA </p>
        <p> Major(s) </p>
        <p> Skills </p>
        <p> Projects</p>
        <p> Experience </p>
        <p> Extracurriculars </p>
        <p> Awards </p>
      </Container>
      <Button> Upload </Button>
      <Button> Clear </Button>
    </div>
    
  )
}
