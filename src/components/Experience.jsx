import { Form, Container, Button, Row, Col } from "react-bootstrap";

export default function Experience(props) {
  return <Container className="resumeDataContainer">
    <Row>
        <Col>
          <Form.Label> Position </Form.Label>
          <Form.Control></Form.Control>
        </Col>
    </Row>
    <Row>
        <Col>
          <Form.Label>  Start Date </Form.Label>
          <Form.Control></Form.Control>
        </Col>
        <Col>
          <Form.Label>  End Date </Form.Label>
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
          <Button onClick={() => props.remove("Experience", props.id)}> Remove </Button>
        </Col>
    </Row>

  </Container>
}