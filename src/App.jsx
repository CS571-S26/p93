import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ResumePage from './pages/ResumePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import Layout from './components/Layout.jsx'
import YourListPage from './pages/YourListPage.jsx'
import FindJobsPage from './pages/FindJobsPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="resume" element={<ResumePage/>} />
        <Route path="yourlist" element={<YourListPage/>} />
        <Route path="findjobs" element={<FindJobsPage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
