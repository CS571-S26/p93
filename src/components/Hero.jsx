import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { HiArrowRight } from "react-icons/hi";
import { useContext } from "react";
import AuthContext from "../AuthContext"

export default function Hero() {
   
  const navigate = useNavigate();

  const user = useContext(AuthContext);

  function handleFindPathRequest(){
    if (user === null) 
      navigate("/login");
    else 
      navigate("/resume");
  }

  return (
    <Container className="heroCard">
      <h1 className="logo">
        <span className="logoPartOne">Intern</span>
        <span className="logoPartTwo">Stack.</span>
      </h1>
      <h2 className="findPathText" onClick={handleFindPathRequest}> Find your path today  
        <HiArrowRight style={{marginLeft: 5}}/>
      </h2>
    </Container>
  )

}