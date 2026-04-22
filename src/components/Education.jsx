import { Form, Container, Button, Row, Col } from "react-bootstrap";
import "../styles/resume.css"

export default function Education(props) {


  return <Container className="resumeDataContainer" style={{animation: "fadeIn 0.4s ease both", animationDelay: `${props.index * 0.3}s`}}>
    <Row className="resumeRow">
        <Col>
          <Form.Label> School </Form.Label>
          <Form.Control value={props.school} onChange={(e) => props.update("Education", props.id, "school", e.target.value)}/> 
        </Col>
    </Row>
    <Row className="resumeRow">
        <Col>
          <Form.Label> Graduation Date </Form.Label>
          <Form.Control value={props.graduationDate} onChange={(e) => props.update("Education", props.id, "graduationDate", e.target.value)}/> 
        </Col>
        <Col>
          <Form.Label> GPA </Form.Label>
          <Form.Control value={props.gpa} onChange={(e) => props.update("Education", props.id, "gpa", e.target.value)}/>
        </Col>
    </Row>
    <Row className="resumeRow">
        <Col>
          <Form.Label> Major(s) </Form.Label>
          <Form.Control value={props.majors} onChange={(e) => props.update("Education", props.id, "majors", e.target.value)} />
        </Col>
    </Row>
    <Row className="resumeRow">
        <Col>
          <Button onClick={() => props.remove("Education", props.id)}> Remove </Button>
        </Col>
    </Row>

  </Container>
}