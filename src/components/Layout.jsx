import { Link, Outlet } from 'react-router-dom'
import '../App.css'
import { useContext } from "react";
import AuthContext from '../AuthContext';

export default function Layout() {

  const user = useContext(AuthContext);

  const navBarStyle = {
    backgroundColor: "black",
    padding: 20,
  }

  return (
    <div>
      <nav style={navBarStyle}>
          <Link className="navBarButton" to="/">Home</Link>
          {
            user !== null ? <>
              <Link className="navBarButton" to="/resume/">Résumé</Link>
              <Link className="navBarButton" to="/findjobs">Find Jobs</Link>
              <Link className="navBarButton" to="/yourlist">Your List</Link>
              <Link className="navBarButton" to="/logout"> Logout </Link>
            </>
             :
            <Link className="navBarButton" to="/login">Login</Link>
          } 

      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
