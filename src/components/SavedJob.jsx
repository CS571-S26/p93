import {Container, Col, Row, Form, Button, CloseButton} from "react-bootstrap";
import { BoxArrowUpRight,  X} from "react-bootstrap-icons";
import "../styles/yourlist.css"

export default function SavedJob(props) {
  


  return <Container className="yourListJobContainer">
    <Row>
     <Col>
      <p style={{fontSize: 20, fontWeight: 550}}>{props.company}</p>
     </Col> 
     <Col>
      <p>{props.role}</p>
     </Col>
     <Col>
      <p>{props.location}</p>
     </Col>
     <Col>
     <a href={props.url} target="_blank" rel="noreferrer">
            <button className="visitButton">
              Visit <BoxArrowUpRight /> 
            </button>
          </a>
     </Col>
     <Col>
      <Form.Label htmlFor="applied" className="visually-hidden"> Apply internship checkbox </Form.Label>
      <Form.Check
        type="checkbox"
        label="Applied"
        id="applied"
        checked={props.applied ?? false}
        onChange={(e) => props.applyChange(props.id, e.target.checked)}
        className="orange-check"
      />
     </Col>

     <Col>
          <button onClick={() => props.handleRemove(props.id)} style={{background: "none", border:"none"}}>
            <X className="removeJobButton" />
          </button>
     </Col>

    </Row>
  
  
  

</Container>
}