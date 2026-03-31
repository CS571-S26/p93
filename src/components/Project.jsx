import { Form, Container, Button, Row, Col } from "react-bootstrap";

export default function Project(props) {
  return <Container className="resumeDataContainer">
    <Row>
        <Col>
          <Form.Label> Name </Form.Label>
          <Form.Control></Form.Control>
        </Col>
    </Row>
    <Row>
        <Col>
          <Form.Label > Description </Form.Label>
          <Form.Control as="textarea"></Form.Control>
        </Col>
    </Row>
    <Row>
        <Col>
          <Button onClick={() => props.remove("Project", props.id)}> Remove </Button>
        </Col>
    </Row>

  </Container>
}