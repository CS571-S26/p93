import {Container, Button} from "react-bootstrap";
import { useState } from "react";
import "../styles/findjobs.css"
import { BoxArrowUpRight, Heart, HeartFill } from "react-bootstrap-icons";


export default function JobPosting(props) {

  const [favorite, setFavorite] = useState(false);

  let matchedSkills = props.matchingSkills.reduce((acc,val) => acc + ", " + val, "");
  if (matchedSkills.length > 2){
    matchedSkills = matchedSkills.substring(2);
  }

  let toLearn = props.skillsToLearn.reduce((acc,val) => acc + ", " + val, "");
  if (toLearn.length > 2){
    toLearn = toLearn.substring(2);
  }

  function handleFavorite() {
    setFavorite(!favorite);
  }
  

  return <Container className="findJobContainer" style={{animation: "fadeIn 0.4s ease both", animationDelay: `${props.index * 0.3}s`}}>
    <h3> {props.role} </h3>
    <p style={{fontSize: 20}}> {props.company} | {props.location} </p>
    <p> {props.description} </p>
    <p> <span style={{fontWeight: "bold"}}> Matching Skills: </span> {matchedSkills} </p>
    <p> <span style={{fontWeight: "bold"}}> To Learn: </span> {toLearn} </p>

    <Container>
          <a href={`https://www.google.com/search?q=${encodeURIComponent(props.company + " " + props.role + " in " + props.location + " internship application 2026")}`} target="_blank" rel="noreferrer">
            <Button className="visitButton">
              Search <BoxArrowUpRight /> 
            </Button>
          </a>
          {
            favorite ? <button className="favoriteButton" onClick={handleFavorite}> 
              Unfavorite <HeartFill/>
            </button> :
            <button className="favoriteButton" onClick={handleFavorite}>
              Favorite <Heart/>
            </button>
          }
    </Container>




  </Container>
}