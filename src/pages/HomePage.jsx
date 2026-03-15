import { useState } from 'react'
import '../App.css'
import { Container } from 'react-bootstrap'

export default function HomePage() {
  const [count, setCount] = useState(0)

  return (
    <Container className="w-100 h-100  justify-content-center align-items-center">
      <h1> InternStack </h1>
      <h3> Find your path. </h3>
    </Container>
  )
}
