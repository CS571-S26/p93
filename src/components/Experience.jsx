import { Form, Container, Button, Row, Col } from "react-bootstrap";

export default function Experience(props) {
  return <Container className="resumeDataContainer" style={{animation: "fadeIn 0.4s ease both", animationDelay: `${props.index * 0.3}s`}}>
    <Row className="resumeRow">
        <Col>
          <Form.Label> Position </Form.Label>
          <Form.Control value={props.position} onChange={(e) => props.update("Experience", props.id, "position", e.target.value)}></Form.Control>
        </Col>
    </Row>
    <Row className="resumeRow">
        <Col>
          <Form.Label> Employer or Organization </Form.Label>
          <Form.Control value={props.employer} onChange={(e) => props.update("Experience", props.id, "employer", e.target.value)}></Form.Control>
        </Col>
    </Row>
    <Row className="resumeRow">
        <Col>
          <Form.Label>  Start Date </Form.Label>
          <Form.Control value={props.start} onChange={(e) => props.update("Experience", props.id, "start", e.target.value)}></Form.Control>
        </Col>
        <Col>
          <Form.Label>  End Date </Form.Label>
          <Form.Control value={props.end} onChange={(e) => props.update("Experience", props.id, "end", e.target.value)}></Form.Control>
        </Col>
    </Row>
    <Row className="resumeRow">
        <Col>
          <Form.Label > Description </Form.Label>
          <Form.Control as="textarea" value={props.description} onChange={(e) => props.update("Experience", props.id, "description", e.target.value)}></Form.Control>
        </Col>
    </Row>
    <Row className="resumeRow">
        <Col>
          <Button onClick={() => props.remove("Experience", props.id)}> Remove </Button>
        </Col>
    </Row>

  </Container>
}