import { Form, Container, Button, Row, Col } from "react-bootstrap";

export default function Education(props) {


  return <Container className="resumeDataContainer">
    <Row>
        <Col>
          <Form.Label> School </Form.Label>
          <Form.Control/> 
        </Col>
    </Row>
    <Row>
        <Col>
          <Form.Label> Graduation Date </Form.Label>
          <Form.Control/> 
        </Col>
        <Col>
          <Form.Label> GPA </Form.Label>
          <Form.Control/>
        </Col>
    </Row>
    <Row>
        <Col>
          <Form.Label> Major(s) </Form.Label>
          <Form.Control/>
        </Col>
    </Row>
    <Row>
        <Col>
          <Button onClick={() => props.remove("Education", props.id)}> Remove </Button>
        </Col>
    </Row>

  </Container>
}