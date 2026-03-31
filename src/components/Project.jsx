import { Form, Container, Button, Row, Col } from "react-bootstrap";

export default function Project(props) {
  return <Container className="resumeDataContainer">
    <Row className="resumeRow">
        <Col>
          <Form.Label> Name </Form.Label>
          <Form.Control value={props.name} onChange={(e) => props.update("Project", props.id, "name", e.target.value)}></Form.Control>
        </Col>
    </Row>
    <Row className="resumeRow">
        <Col>
          <Form.Label > Description </Form.Label>
          <Form.Control as="textarea" value={props.description} onChange={(e) => props.update("Project", props.id, "description", e.target.value)}></Form.Control>
        </Col>
    </Row>
    <Row className="resumeRow">
        <Col>
          <Button onClick={() => props.remove("Project", props.id)}> Remove </Button>
        </Col>
    </Row>

  </Container>
}