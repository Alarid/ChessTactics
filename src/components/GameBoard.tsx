import React, { useState } from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
import { getSideToPlayFromFen } from 'src/utils/TacticBoardUtils'
import ControlStrip from './ControlStrip'
import GameHistory from './GameHistory'

import GameInfos from './GameInfos'
import PlayerInfos from './PlayerInfos'
import TacticBoard from './TacticBoard'

// Props
type Props = {
  tactic: Tactic
  loadTactic: () => void
  nextTactic: () => void
}

// 5 seconds between each blunder
const DELAY_BETWEEN_TACTICS = 5000

// Game Board Component
const GameBoard: React.FC<Props> = ({ tactic, loadTactic, nextTactic }) => {
  const [playerBlack, setPlayerBlack] = useState<Player | null>()
  const [boardKey, setBoardKey] = useState<number>(Date.now())
  const [playerWhite, setPlayerWhite] = useState<Player | null>()
  const [hint, setHint] = useState<Hint>('sideToPlay')
  const [history, setHistory] = useState<TacticHistory[]>([])
  const [message, setMessage] = useState('')

  // Fetch players from game infos component
  const registerPlayers = (black: Player, white: Player) => {
    setPlayerBlack(black)
    setPlayerWhite(white)
  }

  // Add a move to the game history
  const addMoveToHistory = (fen: string, move: string) => {
    const turn = Number(fen.split(' ').slice(-1).pop())
    setHistory((history) => [...history, { turn, move }])
  }

  // Reset the board
  const resetBoard = () => {
    setHint('sideToPlay')
    setMessage('')
    setHistory([])
    setPlayerBlack(null)
    setPlayerWhite(null)
  }

  return (
    <Row>
      <Col xs={12} md={6} className="justify-content-end">
        <div className="d-flex flex-row justify-content-end">
          <GameInfos
            key={`${tactic.id}-${boardKey}-infos`}
            id={tactic.id}
            registerPlayers={registerPlayers}
          />

          <div className="d-flex flex-column justify-content-center">
            <TacticBoard
              key={`${tactic.id}-${boardKey}`}
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
                  } seconds...`
                )
                setTimeout(() => {
                  nextTactic()
                  resetBoard()
                }, DELAY_BETWEEN_TACTICS)
              }}
            />

            <ControlStrip
              hint={hint}
              whiteTurn={getSideToPlayFromFen(tactic.fen) === 'b'}
              onClickRestart={() => {
                setBoardKey(Date.now())
                resetBoard()
              }}
              onClickNext={() => {
                loadTactic()
                nextTactic()
                resetBoard()
              }}
            />
          </div>
        </div>
      </Col>
      <Col xs={12} md={6} className="justify-content-left">
        <Row className="mb-3">
          <Col xs={6}>
            <PlayerInfos side="b" name={playerBlack?.name} elo={playerBlack?.elo} />
          </Col>
          <Col xs={6}>
            <PlayerInfos side="w" name={playerWhite?.name} elo={playerWhite?.elo} />
          </Col>
        </Row>
        {message.length > 0 && <Alert variant="success">{message}</Alert>}
        <GameHistory history={history} />
      </Col>
    </Row>
  )
}

export default GameBoard
