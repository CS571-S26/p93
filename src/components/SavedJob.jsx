import {Container, Col, Row, Form, Button, CloseButton} from "react-bootstrap";
import { BoxArrowUpRight,  X} from "react-bootstrap-icons";
import "../styles/yourlist.css"

export default function SavedJob(props) {
  


  return <Container className="yourListJobContainer">
    <Row>
     <Col>
      <h5 >{props.company}</h5>
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
      <Form.Check
        type="checkbox"
        label="Applied"
        checked={props.applied ?? false}
        onChange={(e) => props.applyChange(props.id, e.target.checked)}
        className="orange-check"
      />
     </Col>

     <Col>
         <X className="removeJobButton" onClick={() => props.handleRemove(props.id)}/>
     </Col>

    </Row>
  
  
  

</Container>
}