import { Container, Row, Col } from "react-bootstrap"

export default function Guide(props) {
  return <Container style={{display: "flex", flexDirection: "column", alignItems:"center", marginTop: 40, paddingBottom:40}}>
    <h1 style={{paddingBottom: 20}}> Features</h1>
    <Container>
      <Row>
        <Col className="customCard">
          <p> Enter your Résumé details</p>
        </Col>
        <Col className="customCard">
          <p> Get tailored postings</p>
        </Col>
      </Row>
      <Row>
        <Col className="customCard">
          <p> Save your favorite internships</p>
        </Col>
        <Col className="customCard">
          <p> Recieve personalized feedback </p>
        </Col>
      </Row>
    </Container>
  </Container>
}