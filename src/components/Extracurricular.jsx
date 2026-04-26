import { Form, Container, Button, Row, Col } from "react-bootstrap";

export default function Extracurricular(props) {
  return <Container className="resumeDataContainer" style={{animation: "fadeIn 0.4s ease both", animationDelay: `${props.index * 0.3}s`}} >
    <Row className="resumeRow">
        <Col>
          <Form.Label htmlFor="name"> Name </Form.Label>
          <Form.Control id="name" value={props.name} onChange={(e) => props.update("Extracurricular", props.id, "name", e.target.value)}></Form.Control>
        </Col>
    </Row>
    <Row className="resumeRow">
        <Col>
          <Form.Label htmlFor="desc"> Description </Form.Label>
          <Form.Control id="desc" as="textarea" value={props.description} onChange={(e) => props.update("Extracurricular", props.id, "description", e.target.value)}></Form.Control>
        </Col>
    </Row>
    <Row className="resumeRow">
        <Col>
          <Button onClick={() => props.remove("Extracurricular", props.id)}> Remove </Button>
        </Col>
    </Row>

  </Container>
}