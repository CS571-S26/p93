import '../App.css'
import "../styles/findjobs.css"
import { Card, Container, Button, Form, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../AuthContext";
import { getFunctions, httpsCallable } from "firebase/functions";
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import JobPosting from "../components/JobPosting"

export default function FindJobsPage() {


  const [generatedJobs, setGeneratedJobs] = useState([]);
  const user = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const promptRef = useRef();

  useEffect(() => {
    if (user) {

      getDoc(doc(db, "lastFindings", user.uid)).then((snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setGeneratedJobs(JSON.parse(data.jobs));
        }
      });
    }
  }, [user])

  async function handleGenerate() {
    if (user) {
      try {
        setLoading(true);
        const snap = await getDoc(doc(db, "resumes", user.uid));
    
        if (!snap.exists()) {
          alert("No resume found! Please fill out your resume first.");
          return;
        }
    
        const resume = snap.data();
    
        const functions = getFunctions();
        const generateJobs = httpsCallable(functions, "generateJobs");

        const result = await generateJobs({
          resume,
          previousJobs: generatedJobs,
          prompt: promptRef.current.value
        });

        const jobs = result.data.jobs;
        setGeneratedJobs(jobs);
        setLoading(false);
    
        try {
          await setDoc(doc(db, "lastFindings", user.uid), { jobs: JSON.stringify(jobs) });
        } catch (err) {
          console.log(err);
        }

      } catch(err) {
        console.log(err);
        alert("Something went wrong generating jobs. Please try again.");
      } finally {
        setLoading(false);
      }

  
    } else {
      alert("Please login to generate job postings.");
    }
  }


  return (
    <div>
      <Container style={{padding: 40, display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h1 style={{}} className="findJobsHeader"> Find Jobs</h1>
        <Container className="findJobContainer">
          <Container style={{marginBottom: 20}} >
            <Row className="align-items-end">
              <Col>
                <Form.Label> Prompt </Form.Label>
                <Form.Control ref={promptRef} placeholder="Enter locations and types of positions you're interested in!"/>
              </Col>
              <Col>
                <button className="generateButton" onClick={handleGenerate} disabled={loading}> Generate </button>
              </Col>

            </Row>
          </Container>
          {
            generatedJobs.length === 0 && !loading ? <p className="noJobsMessage"> Looks like no jobs are available! Try clicking the 'Generate' button! </p> : <></>
          }
          {
            loading ? <p className="loadingText"> Generating internships... please wait. Do not reload or change pages. </p> : <></>
          }
          {
            generatedJobs.length > 0 ? generatedJobs.map((j, index) => {
              return <JobPosting key={j.id} index={index} {...j} />
            }) : <></>
          }
        </Container>
      </Container>
    </div>
  )
}