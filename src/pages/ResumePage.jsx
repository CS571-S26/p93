import '../App.css'
import { Container, Button, Form } from 'react-bootstrap'
import { useState } from "react";
import Education from "../components/Education"
import Experience from "../components/Experience"
import Project from "../components/Project"
import Skill from "../components/Skill"
import Extracurricular from "../components/Extracurricular"
import Award from "../components/Award"

export default function ResumePage() {

  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [extracurriculars, setExtracurriculars] = useState([]);
  const [awards, setAwards] = useState([]);
  const [skills, setSkills] = useState([]);

  function addItem(type){
    if (type === "Education")
      setEducations(prev => [...prev, { school: "", graduationDate:"", gpa:"", majors:"", id: crypto.randomUUID()}]);
    else if (type === "Experience")
      setExperiences(prev => [...prev, { position: "", dates: "", description: "" , id: crypto.randomUUID()}]);
    else if (type === "Project")
      setProjects(prev => [...prev, { name: "", description: "" , id: crypto.randomUUID()}]);
    else if (type === "Extracurricular")
      setExtracurriculars(prev => [...prev, { name: "" , id: crypto.randomUUID()}]);
    else if (type === "Award") 
      setAwards(prev => [...prev, { name: "" , id: crypto.randomUUID()}]);
    else if (type === "Skill")
      setSkills(prev => [...prev, { name: "" , id: crypto.randomUUID()}]);
  }

  function removeItem(type, id) {
    if (type === "Education") 
      setEducations(prev => prev.filter(item => item.id !== id));
    else if (type === "Experience") 
      setExperiences(prev => prev.filter(item => item.id !== id));
    else if (type === "Project") 
      setProjects(prev => prev.filter(item => item.id !== id));
    else if (type === "Extracurricular") 
      setExtracurriculars(prev => prev.filter(item => item.id !== id));
    else if (type === "Award") 
      setAwards(prev => prev.filter(item => item.id !== id));
    else if (type === "Skill") 
      setSkills(prev => prev.filter(item => item.id !== id));
  }
    

  return (
    <div>
      <Container style={{padding: 50, display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h1> Résumé Details</h1>
      </Container>

      <Container style={{paddingBottom: 30}}>
        <h2> Education</h2>
        {
          educations.length > 0 
            ? educations.map(edu => <Education key={edu.id} remove={removeItem} {...edu}/>) 
            : <p> No educations currently saved</p>
        }
        <button className="addButton" onClick={() => addItem("Education")}> Add Education </button>
      </Container>

      <Container style={{paddingBottom: 30}}>
        <h2> Experience </h2>
        {
          experiences.length > 0
            ? experiences.map(exp => (
                <Experience key={exp.id} remove={removeItem} {...exp}/>
              ))
            : <p> No experiences currently saved</p>
        }
        <button className="addButton" onClick={() => addItem("Experience")}> Add Experience </button>
      </Container>

      <Container style={{paddingBottom: 30}}>
        <h2> Projects</h2>
        {
          projects.length > 0
            ? projects.map(proj => (
                <Project key={proj.id} remove={removeItem} {...proj}/>
              ))
            : <p> No projects currently saved</p>
        }
        <button  className="addButton" onClick={() => addItem("Project")}> Add Project </button>
      </Container>

      <Container style={{paddingBottom: 30}}>
        <h2> Extracurriculars </h2>
        {
          extracurriculars.length > 0
            ? extracurriculars.map(extra => (
                <Extracurricular key={extra.id} remove={removeItem} {...extra}/>
              ))
            : <p> No extracurriculars currently saved</p>
        }
        <button className="addButton" onClick={() => addItem("Extracurricular")}> Add Extracurricular </button>
      </Container>

      <Container style={{paddingBottom: 30}}>
        <h2> Awards </h2>
        {
          awards.length > 0
            ? awards.map(award => (
                <Award key={award.id} remove={removeItem} {...award}/>
              ))
            : <p> No awards currently saved</p>
        }
        <button className="addButton" onClick={() => addItem("Award")}> Add Award </button>
      </Container>

      <Container style={{paddingBottom: 30}}>
        <h2> Skills </h2>
        {
          skills.length > 0
            ? skills.map(skill => (
                <Skill key={skill.id} remove={removeItem} {...skill}/>
              ))
            : <p> No skills currently saved</p>
        }
        <button className="addButton" onClick={() => addItem("Skill")}> Add Skill </button>
      </Container>

      <Container style={{paddingBottom: 30}}>
        <button className="saveButton"> Save </button>
        <Button> Clear </Button>
      </Container>
    </div>
  )
}
