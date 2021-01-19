import React, { useState, useEffect } from 'react'
import { Container, Spinner, Button } from 'react-bootstrap'
import { ArrowRight, RefreshCw } from 'react-feather'
import styled from 'styled-components/macro'

import TacticBoard from './components/TacticBoard'
import { fetchTactic } from './services/fetchTactic'
import Tactic from './types/Tactic'
import { getSideToPlayFromFen } from './utils/TacticBoardUtils'
import GameStatus from './components/GameStatus'

const ControlStrip = styled.div`
  width: 400px;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const App: React.FC = () => {
  const [tactics, setTactics] = useState<Tactic[]>([])
  const [boardKey, setBoardKey] = useState<number>(Date.now())
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
  console.log(tactic.solution)
  return (
    <Container className="text-center">
      <h1>Tactics Trainer</h1>
      <div className="d-flex justify-content-center">
        <TacticBoard
          key={`${tactic.id}-${boardKey}`}
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
      <ControlStrip>
        <Button
          variant="light"
          onClick={() => {
            setBoardKey(Date.now())
            setHint('sideToPlay')
          }}
        >
          <RefreshCw className="mr-1" /> Restart
        </Button>
        <GameStatus hint={hint} whiteTurn={getSideToPlayFromFen(tactic.fen) === 'b'} />
        <Button
          variant="light"
          onClick={() => {
            loadTactic()
            setTactics((it) => it.slice(1))
            setHint('sideToPlay')
          }}
        >
          Next <ArrowRight className="ml-1" />
        </Button>
      </ControlStrip>
    </Container>
  )
}

export default App
