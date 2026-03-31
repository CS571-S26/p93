import { Form, Container, Button, Row, Col } from "react-bootstrap";

export default function Skill(props) {
  return <Container className="resumeDataContainer">
    <Row>
        <Col>
          <Form.Label> Name </Form.Label>
          <Form.Control></Form.Control>
        </Col>
    </Row>
    <Row>
        <Col>
          <Button onClick={() => props.remove("Skill", props.id)}> Remove </Button>
        </Col>
    </Row>

  </Container>
}