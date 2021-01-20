import React, { useState, useEffect } from 'react'
import { Container, Spinner, Button, Alert } from 'react-bootstrap'
import { ArrowRight, RefreshCw } from 'react-feather'
import styled from 'styled-components/macro'

import TacticBoard from './components/TacticBoard'
import { fetchTactic } from './services/fetchTactic'
import Tactic from './types/Tactic'
import { getSideToPlayFromFen } from './utils/TacticBoardUtils'
import GameStatus from './components/GameStatus'
import GameInfos from './components/GameInfos'

const ControlStrip = styled.div`
  width: 100%;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Skeleton: React.FC = ({ children }) => (
  <Container className="text-center py-3">
    <h1 className="mb-3">Tactics Trainer</h1>
    {children}
  </Container>
)

const DELAY_BETWEEN_TACTICS = 3000

const App: React.FC = () => {
  const [tactics, setTactics] = useState<Tactic[]>([])
  const [boardKey, setBoardKey] = useState<number>(Date.now())
  const [hint, setHint] = useState<'sideToPlay' | 'incorrect' | 'correct' | 'solved'>('sideToPlay')
  const [message, setMessage] = useState('')
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
  const tactic = tactics[0]
  const tacticKey = `${tactic.id}-${boardKey}`
  console.log(tactic.solution)
  return (
    <Skeleton>
      <div className="d-flex justify-content-center align-items-start">
        <div className="d-flex flex-column position-relative">
          <TacticBoard
            key={tacticKey}
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
              setMessage(
                `Congratulations! Moving to next tactic in ${DELAY_BETWEEN_TACTICS / 1000} seconds`
              )
              setTimeout(() => {
                setTactics((it) => it.slice(1))
                setHint('sideToPlay')
                setMessage('')
              }, DELAY_BETWEEN_TACTICS)
            }}
          />
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
          <GameInfos key={`${tacticKey}-infos`} id={tactic.id} />
          {message.length > 0 && <Alert variant="success">{message}</Alert>}
        </div>
      </div>
    </Skeleton>
  )
}

export default App
