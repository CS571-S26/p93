import {Container, Button} from "react-bootstrap";
import { useState } from "react";
import "../styles/findjobs.css"
import { BoxArrowUpRight, Heart, HeartFill } from "react-bootstrap-icons";


export default function JobPosting(props) {

  const [favorite, setFavorite] = useState(props.favorite);

  const matchingSkills = Array.isArray(props.matchingSkills) 
  ? props.matchingSkills 
  : props.matchingSkills?.split(",").map(s => s.trim()) || [];

  const skillsToLearn = Array.isArray(props.skillsToLearn)
  ? props.skillsToLearn
  : props.skillsToLearn?.split(",").map(s => s.trim()) || [];

  const matchedSkills = matchingSkills.join(", ");
  const toLearn = skillsToLearn.join(", ");

  function handleFavorite() {
    setFavorite(!favorite);
    props.handleFavoritePress(!favorite, props.id);
  }
  

  return <Container className="findJobContainer" style={{animation: "fadeIn 0.4s ease both", animationDelay: `${props.index * 0.1}s`}}>
    <h3> {props.role} </h3>
    <p style={{fontSize: 20}}> {props.company} | {props.location} </p>
    <p> {props.description} </p>
    <p> <span style={{fontWeight: "bold"}}> Matching Skills: </span> {matchedSkills ? matchedSkills : "N/A"} </p>
    <p> <span style={{fontWeight: "bold"}}> To Learn: </span> {toLearn ? toLearn : "N/A"} </p>

    <Container>
          <a href={props.url} target="_blank" rel="noreferrer">
            <button style={{padding: 5}}>
              Visit <BoxArrowUpRight /> 
            </button>
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