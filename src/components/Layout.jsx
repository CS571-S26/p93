import { Link, Outlet } from 'react-router-dom'
import '../App.css'

export default function Layout() {

  const navBarStyle = {
    backgroundColor: "black",
    padding: 20,
  }


  return (
    <div>
      <nav style={navBarStyle}>
        <Link className="navBarButton" to="/">Home</Link>
        <Link className="navBarButton" to="/login">Login</Link>
        <Link className="navBarButton" to="/resume/">Résumé</Link>
        <Link className="navBarButton" to="/findjobs">Find Jobs</Link>
        <Link className="navBarButton" to="/yourlist">Your List</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
