import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { HiArrowRight } from "react-icons/hi";

export default function Hero() {
   
  const navigate = useNavigate();

  function handleFindPathRequest(){
    navigate("/resume")
  }

  return (
    <Container className="heroCard">
      <h1 className="logo">
        <span className="logoPartOne">Intern</span>
        <span className="logoPartTwo">Stack.</span>
      </h1>
      <h3 className="findPathText" onClick={handleFindPathRequest}> Find your path today  
        <HiArrowRight style={{marginLeft: 5}}/>
      </h3>
    </Container>
  )

}