import '../styles/resume.css'
import { Container, Button} from 'react-bootstrap'
import { useState, useEffect } from "react";
import Education from "../components/Education"
import Experience from "../components/Experience"
import Project from "../components/Project"
import Skill from "../components/Skill"
import Extracurricular from "../components/Extracurricular"
import Award from "../components/Award"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useContext } from "react";
import AuthContext from "../AuthContext";

export default function ResumePage() {

  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [extracurriculars, setExtracurriculars] = useState([]);
  const [awards, setAwards] = useState([]);
  const [skills, setSkills] = useState([]);

  const user = useContext(AuthContext);

  // Handles initial load of resume data
  useEffect(() => {

    if (user) {
      getDoc(doc(db, "resumes", user.uid)).then((snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setEducations(data.educations || []);
          setExperiences(data.experiences || []);
          setProjects(data.projects || []);
          setExtracurriculars(data.extracurriculars || []);
          setAwards(data.awards || []);
          setSkills(data.skills || []);
        }
      });
    }

  }, [user]);

  function updateItem(type, id, field, value) {
    const updater = (arr) =>
      arr.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      );
  
    if (type === "Education") setEducations(prev => updater(prev));
    else if (type === "Experience") setExperiences(prev => updater(prev));
    else if (type === "Project") setProjects(prev => updater(prev));
    else if (type === "Extracurricular") setExtracurriculars(prev => updater(prev));
    else if (type === "Award") setAwards(prev => updater(prev));
    else if (type === "Skill") setSkills(prev => updater(prev));
  }

  function addItem(type){
    if (type === "Education")
      setEducations(prev => [...prev, { school: "", graduationDate:"", gpa:"", majors:"", id: crypto.randomUUID()}]);
    else if (type === "Experience")
      setExperiences(prev => [...prev, { position: "", employer: "", start: "", end: "", description: "" , id: crypto.randomUUID()}]);
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

  async function handleSave() {

    if (user) {
      const resume = {
        "educations": educations,
        "experiences": experiences,
        "projects": projects,
        "extracurriculars": extracurriculars,
        "awards": awards,
        "skills": skills
      }
      try {
        await setDoc(doc(db, "resumes", user.uid), resume);
        alert("Your résumé has been synced!");
      } catch (err) {
        console.log(err);
        alert("Error saving résumé. Please try again.");
      }

    } else {
      alert("Saving résumé is not available if you are not logged in!");
    }
  }
    

  return (
    <div>
      <Container style={{padding: 40, display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h1 className="resumeHeader"> Résumé Details</h1>
      </Container>

      <Container style={{paddingBottom: 30}}>
        <h2> Education</h2>
        {
          educations.length > 0 
            ? educations.map((edu, index)=> <Education key={edu.id} 
              remove={removeItem} 
              {...edu} 
              update={updateItem}
              index={index}
              />) 
            : <p> No educations currently saved</p>
        }
        <button className="addButton" onClick={() => addItem("Education")}> Add Education </button>
      </Container>

      <Container style={{paddingBottom: 30}}>
        <h2> Experience </h2>
        {
          experiences.length > 0
            ? experiences.map((exp, index) => (
                <Experience key={exp.id} 
                remove={removeItem} 
                {...exp}
                update={updateItem}
                index={index}
                />
              ))
            : <p> No experiences currently saved</p>
        }
        <button className="addButton" onClick={() => addItem("Experience")}> Add Experience </button>
      </Container>

      <Container style={{paddingBottom: 30}}>
        <h2> Projects</h2>
        {
          projects.length > 0
            ? projects.map((proj, index) => (
                <Project key={proj.id} 
                remove={removeItem} 
                {...proj}
                update={updateItem}
                index={index}
                />
              ))
            : <p> No projects currently saved</p>
        }
        <button  className="addButton" onClick={() => addItem("Project")}> Add Project </button>
      </Container>

      <Container style={{paddingBottom: 30}}>
        <h2> Extracurriculars </h2>
        {
          extracurriculars.length > 0
            ? extracurriculars.map((extra,index) => (
                <Extracurricular key={extra.id} 
                remove={removeItem} 
                {...extra}
                update={updateItem}/>
              ))
            : <p> No extracurriculars currently saved</p>
        }
        <button className="addButton" onClick={() => addItem("Extracurricular")}> Add Extracurricular </button>
      </Container>

      <Container style={{paddingBottom: 30}}>
        <h2> Awards </h2>
        {
          awards.length > 0
            ? awards.map((award, index) => (
                <Award key={award.id} 
                remove={removeItem} 
                {...award}
                update={updateItem}
                index={index}
                />
              ))
            : <p> No awards currently saved</p>
        }
        <button className="addButton" onClick={() => addItem("Award")}> Add Award </button>
      </Container>

      <Container style={{paddingBottom: 30}}>
        <h2> Skills </h2>
        {
          skills.length > 0
            ? skills.map((skill,index) => (
                <Skill key={skill.id} 
                remove={removeItem} 
                {...skill}
                update={updateItem}
                index={index}
                />
              ))
            : <p> No skills currently saved</p>
        }
        <button className="addButton" onClick={() => addItem("Skill")}> Add Skill </button>
      </Container>

      <Container style={{paddingBottom: 30}}>
        <Button style={{marginRight: 10}} onClick={handleSave}> Save </Button>
      </Container>
    </div>
  )
}
