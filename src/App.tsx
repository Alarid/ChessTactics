import React, { useState, useEffect } from 'react'
import { Container, Spinner, Alert } from 'react-bootstrap'

import { fetchTactic } from './services/fetchTactic'
import GameBoard from './components/GameBoard'

// Main container for the app
const Skeleton: React.FC = ({ children }) => (
  <Container className="text-center py-3">
    <h1 className="mb-3">Chess Tactics Trainer</h1>
    {children}
  </Container>
)

// App Component
const App: React.FC = () => {
  const [tactics, setTactics] = useState<Tactic[]>([])
  const [error, setError] = useState('')

  // Fetch a new tactic from API
  const loadTactic = async () => {
    const newTactic = await fetchTactic()
    if (newTactic) {
      setTactics((it) => it.concat(newTactic))
    } else {
      setError('Oops, something went wrong...')
    }
  }

  // Load 2 tactics on component mount (1 for now, 1 for later)
  useEffect(() => {
    loadTactic()
    loadTactic()
  }, [])

  // Something went wrong
  if (error.length > 0) {
    return (
      <Skeleton>
        <Alert variant="danger">{error}</Alert>
      </Skeleton>
    )
  }

  // Loading state
  if (tactics.length === 0) {
    // TODO
    return (
      <Skeleton>
        <Spinner role="status" animation="border" className="mr-2" />
        Loading...
      </Skeleton>
    )
  }

  // Render
  return (
    <Skeleton>
      <GameBoard
        tactic={tactics[0]}
        loadTactic={loadTactic}
        nextTactic={() => setTactics((it) => it.slice(1))}
      />
    </Skeleton>
  )
}

export default App
