import React, { useState, useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import TacticBoard from './components/TacticBoard'
import { fetchTactic } from './services/fetchTactic'
import Tactic from './types/Tactic'
import { getSideToPlayFromFen } from './utils/TacticBoardUtils'
import GameStatus from './components/GameStatus'

const App: React.FC = () => {
  const [tactics, setTactics] = useState<Tactic[]>([])
  const [hint, setHint] = useState<'sideToPlay' | 'incorrect' | 'correct' | 'solved'>('sideToPlay')

  // Fetch a new tactic from API
  const loadTactic = async () => {
    try {
      const newTactic = await fetchTactic()
      setTactics((it) => it.concat(newTactic))
    } catch (error) {
      console.error('Error loading tactic', { error })
    }
  }

  // Load 2 tactics on component mount (1 for now, 1 for later)
  useEffect(() => {
    loadTactic()
    loadTactic()
  }, [])

  // Loading state
  if (tactics.length === 0) {
    // TODO
    return (
      <Container>
        <Spinner role="status" animation="border" />
        Loading...
      </Container>
    )
  }

  // Render
  const tactic = tactics[0]
  return (
    <Container className="text-center">
      <h1>Tactics Trainer</h1>
      <div className="d-flex justify-content-center">
        <TacticBoard
          key={tactic.id}
          tactic={tactic}
          onCorrect={() => {
            setHint('correct')
            setTimeout(() => setHint('sideToPlay'), 1000)
          }}
          onIncorrect={() => {
            setHint('incorrect')
            setTimeout(() => setHint('sideToPlay'), 1000)
          }}
          onSolve={() => {
            setHint('solved')
            loadTactic()
            setTimeout(() => {
              setTactics((it) => it.slice(1))
              setHint('sideToPlay')
            }, 1000)
          }}
        />
      </div>
      <div className="text-center mt-3">
        <GameStatus hint={hint} whiteTurn={getSideToPlayFromFen(tactic.fen) === 'b'} />
      </div>
    </Container>
  )
}

export default App
