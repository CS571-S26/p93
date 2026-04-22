import { Form, Container, Button, Row, Col } from "react-bootstrap";

export default function Skill(props) {
  return <Container className="resumeDataContainer" style={{animation: "fadeIn 0.4s ease both"}} >
    <Row className="resumeRow">
        <Col>
          <Form.Label> Name </Form.Label>
          <Form.Control value={props.name} onChange={(e) => props.update("Skill", props.id, "name", e.target.value)}></Form.Control>
        </Col>
    </Row>
    <Row className="resumeRow">
        <Col>
          <Button onClick={() => props.remove("Skill", props.id)}> Remove </Button>
        </Col>
    </Row>
  </Container>
}