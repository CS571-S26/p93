import { Form, Container, Button, Row, Col } from "react-bootstrap";

export default function Experience(props) {
  return <Container className="resumeDataContainer" style={{animation: "fadeIn 0.4s ease both"}}>
    <Row className="resumeRow">
        <Col>
          <Form.Label htmlFor="position"> Position </Form.Label>
          <Form.Control id="position" value={props.position} onChange={(e) => props.update("Experience", props.id, "position", e.target.value)}></Form.Control>
        </Col>
    </Row>
    <Row className="resumeRow">
        <Col>
          <Form.Label htmlFor="employer" > Employer or Organization </Form.Label>
          <Form.Control id="employer" value={props.employer} onChange={(e) => props.update("Experience", props.id, "employer", e.target.value)}></Form.Control>
        </Col>
    </Row>
    <Row className="resumeRow">
        <Col>
          <Form.Label htmlFor="start">  Start Date </Form.Label>
          <Form.Control id="start" value={props.start} onChange={(e) => props.update("Experience", props.id, "start", e.target.value)}></Form.Control>
        </Col>
        <Col>
          <Form.Label htmlFor="end">  End Date </Form.Label>
          <Form.Control id="end" value={props.end} onChange={(e) => props.update("Experience", props.id, "end", e.target.value)}></Form.Control>
        </Col>
    </Row>
    <Row className="resumeRow">
        <Col>
          <Form.Label htmlFor="desc"> Description </Form.Label>
          <Form.Control id="desc" as="textarea" value={props.description} onChange={(e) => props.update("Experience", props.id, "description", e.target.value)}></Form.Control>
        </Col>
    </Row>
    <Row className="resumeRow">
        <Col>
          <Button onClick={() => props.remove("Experience", props.id)}> Remove </Button>
        </Col>
    </Row>

  </Container>
}