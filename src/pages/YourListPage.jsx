import '../App.css'
import "../styles/yourlist.css"
import { Card, Container, Button, Form, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useContext } from "react";
import AuthContext from "../AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import SavedJob from "../components/SavedJob"
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

export default function YourListPage() {
  const [favorites, setFavorites] = useState([]);
  const [appliedOpen, setAppliedOpen] = useState(false);
  const [notAppliedOpen, setNotAppliedOpen] = useState(true);

  const user = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      getDoc(doc(db, "favoritedFindings", user.uid)).then((snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setFavorites(JSON.parse(data.favorites));
        }
      });
    }
  }, [user]);

  const onAppliedChange = async (id, checked) => {
    const updated = favorites.map(f =>
      f.id === id ? { ...f, applied: checked } : f
    );
    setFavorites(updated);
    if (user) {
      await setDoc(doc(db, "favoritedFindings", user.uid), {
        favorites: JSON.stringify(updated)
      });
    }
  };

  const handleRemove = async (id) => {

    const confirmed = window.confirm("The job will be removed from your list. Press OK if you wish to proceed.");
    if (!confirmed) return;


    const updated = favorites.filter(f =>
      f.id !== id 
    );
    setFavorites(updated);
    if (user) {
      await setDoc(doc(db, "favoritedFindings", user.uid), {
        favorites: JSON.stringify(updated)
      });
    }
  }

  const applied = favorites.filter(f => f.applied);
  const notApplied = favorites.filter(f => !f.applied);

  return (
    <Container style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 className="yourListHeader">Your List</h1>

      <Container className="yourListContainer">

        <div
          className="section-header"
          onClick={() => setNotAppliedOpen(o => !o)}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #dee2e6" }}
        >
          <h5 style={{ margin: 0 }}>
            Open
            <span style={{ marginLeft: 10, fontSize: "0.85rem", color: "#6c757d" }}>({notApplied.length})</span>
          </h5>
          {notAppliedOpen ? <ChevronUp /> : <ChevronDown />}
        </div>

        {notAppliedOpen && (
          <div style={{ marginBottom: 20 }}>
            {notApplied.length === 0
              ? <p style={{ padding: "12px 0", color: "#6c757d" }}>No internships here yet.</p>
              : notApplied.map(f => <SavedJob key={f.id} applyChange={onAppliedChange} handleRemove={handleRemove} {...f} />)
            }
          </div>
        )}

        <div
          className="section-header"
          onClick={() => setAppliedOpen(o => !o)}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #dee2e6" }}
        >
          <h5 style={{ margin: 0 }}>
            Applied
            <span style={{ marginLeft: 10, fontSize: "0.85rem", color: "#6c757d" }}>({applied.length})</span>
          </h5>
          {appliedOpen ? <ChevronUp /> : <ChevronDown />}
        </div>

        {appliedOpen && (
          <div style={{ marginBottom: 20 }}>
            {applied.length === 0
              ? <p style={{ padding: "12px 0", color: "#6c757d" }}>No applications marked yet.</p>
              : applied.map(f => <SavedJob key={f.id} applyChange={onAppliedChange} handleRemove={handleRemove} {...f} />)
            }
          </div>
        )}

      </Container>
    </Container>
  );
}

