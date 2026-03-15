import { Link, Outlet } from 'react-router-dom'
import '../App.css'

export default function Layout() {
  return (
    <div>
      <nav className="m-3">
        <Link to="/" className="me-3">Home</Link>
        <Link to="/about/" className="me-3">About</Link>
        <Link to="/resume/">Resume</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
