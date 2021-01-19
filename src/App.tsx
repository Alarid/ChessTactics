import React, { useState, useEffect } from 'react'
import { Button, Container, Spinner } from 'react-bootstrap'
import TacticBoard from './components/TacticBoard';
import { fetchTactic } from './services/fetchTactic';
import Tactic from './types/Tactic';
import { getSideToPlayFromFen } from './utils/TacticBoardUtils';

function App() {
  const [tactics, setTactics] = useState<Tactic[]>([])
  const [hint, setHint] = useState<"sideToPlay" | "incorrect" | "correct" | "solved">("sideToPlay")

  const loadTactic = async () => {
    try {
      const newTactic = await fetchTactic()
      setTactics((it) => it.concat(newTactic))
    } catch (error) {
      console.error("Error loading tactic", { error })
    }
  }

  useEffect(() => {
    loadTactic()
    loadTactic()
  }, [])

  if (tactics.length === 0) {
    // TODO
    return (
      <Container>
        <Spinner role="status" animation="border" />
        Loading...
      </Container>
    )
  }

  const tactic = tactics[0]
  return (
    <Container className="text-center">
      <h1>Tactics Trainer</h1>
      <div className="d-flex justify-content-center">
        <TacticBoard
          key={tactic.id}
          tactic={tactic}
          onCorrect={() => {
            setHint("correct")
            setTimeout(() => setHint("sideToPlay"), 1000)
          }}
          onIncorrect={() => {
            setHint("incorrect")
            setTimeout(() => setHint("sideToPlay"), 1000)
          }}
          onSolve={() => {
            setHint("solved")
            loadTactic()
            setTimeout(() => {
              setTactics((it) => it.slice(1))
              setHint("sideToPlay")
            }, 1000)
          }}
        />
      </div>
      <div className="text-center mt-3">
        {hint === "sideToPlay" && (
          <Button variant="dark">
            {getSideToPlayFromFen(tactic.fen) === "b" ? "White" : "Black"} to move
          </Button>
        )}
        {hint === "correct" && (
          <Button variant="primary">
            Correct!
          </Button>
        )}
        {hint === "incorrect" && (
          <Button variant="danger">
            Incorrect!
          </Button>
        )}
        {hint === "solved" && (
          <Button variant="success">
            Solved!
          </Button>
        )}
      </div>
    </Container>
  )
}

export default App;
