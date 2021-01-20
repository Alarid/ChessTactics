import React, { useState, useEffect } from 'react'
import { Container, Spinner, Button, Alert, Row, Col } from 'react-bootstrap'
import { ArrowRight, RefreshCw } from 'react-feather'
import styled from 'styled-components/macro'

import TacticHistory from './types/TacticHistory'
import Tactic from './types/Tactic'
import { Player } from './types/TacticInfos'

import TacticBoard from './components/TacticBoard'
import { fetchTactic } from './services/fetchTactic'
import { getSideToPlayFromFen } from './utils/TacticBoardUtils'
import GameStatus from './components/GameStatus'
import GameInfos from './components/GameInfos'
import GameHistory from './components/GameHistory'
import PlayerInfos from './components/PlayerInfos'

const ControlStrip = styled.div`
  width: 100%;
  margin: 30px auto 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const GameInfosContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: start;
  margin-right: 15px;
  margin-top: 50px;
`

const Skeleton: React.FC = ({ children }) => (
  <Container className="text-center py-3">
    <h1 className="mb-3">Chess Tactics Trainer</h1>
    {children}
  </Container>
)

const DELAY_BETWEEN_TACTICS = 3000

const App: React.FC = () => {
  const [tactics, setTactics] = useState<Tactic[]>([])
  const [boardKey, setBoardKey] = useState<number>(Date.now())
  const [hint, setHint] = useState<'sideToPlay' | 'incorrect' | 'correct' | 'solved'>('sideToPlay')
  const [history, setHistory] = useState<TacticHistory[]>([])
  const [playerBlack, setPlayerBlack] = useState<Player>()
  const [playerWhite, setPlayerWhite] = useState<Player>()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Add a move to the game history
  const addMoveToHistory = (fen: string, move: string) => {
    const turn = Number(fen.split(' ').slice(-1).pop())
    setHistory((history) => [...history, { turn, move }])
  }

  // Fetch a new tactic from API
  const loadTactic = async () => {
    const newTactic = await fetchTactic()
    if (newTactic) {
      setTactics((it) => it.concat(newTactic))
    } else {
      setError('Oops, something went wrong...')
    }
  }

  // Reset the board
  const resetBoard = () => {
    setHint('sideToPlay')
    setMessage('')
    setHistory([])
  }

  // Fetch players from game infos component
  const registerPlayers = (black: Player, white: Player) => {
    setPlayerBlack(black)
    setPlayerWhite(white)
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
      <Row>
        <Col xs={12} md={6} className="justify-content-end">
          <div className="d-flex flex-row justify-content-end">
            <GameInfosContainer>
              <GameInfos
                key={`${tacticKey}-infos`}
                id={tactic.id}
                registerPlayers={registerPlayers}
              />
            </GameInfosContainer>

            <div className="d-flex flex-column justify-content-center">
              <TacticBoard
                key={tacticKey}
                tactic={tactic}
                registerMove={addMoveToHistory}
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
                    `Congratulations! Moving to next tactic in ${
                      DELAY_BETWEEN_TACTICS / 1000
                    } seconds`
                  )
                  setTimeout(() => {
                    setTactics((it) => it.slice(1))
                    resetBoard()
                  }, DELAY_BETWEEN_TACTICS)
                }}
              />
              <ControlStrip>
                <Button
                  variant="light"
                  onClick={() => {
                    setBoardKey(Date.now())
                    resetBoard()
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
            </div>
          </div>
        </Col>
        <Col xs={12} md={6} className="justify-content-left">
          {playerBlack && playerWhite && (
            <Row className="mb-3">
              <Col xs={6}>
                <PlayerInfos side="b" name={playerBlack.name} elo={playerBlack.elo} />
              </Col>
              <Col xs={6}>
                <PlayerInfos side="w" name={playerWhite.name} elo={playerWhite.elo} />
              </Col>
            </Row>
          )}
          {message.length > 0 && <Alert variant="success">{message}</Alert>}
          <GameHistory history={history} />
        </Col>
      </Row>
    </Skeleton>
  )
}

export default App
