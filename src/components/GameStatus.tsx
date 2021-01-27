import React from 'react'
import { Button } from 'react-bootstrap'

// Props
type Props = {
  hint: 'sideToPlay' | 'incorrect' | 'correct' | 'solved'
  whiteTurn: boolean
}

// Game Status: black / white to move, correct move, incorrect move, ...
const GameStatus: React.FC<Props> = ({ hint, whiteTurn }) => (
  <>
    {hint === 'sideToPlay' && (
      <Button variant="dark">{whiteTurn ? 'White' : 'Black'} to move</Button>
    )}
    {hint === 'correct' && <Button variant="primary">Correct!</Button>}
    {hint === 'incorrect' && <Button variant="danger">Incorrect!</Button>}
    {hint === 'solved' && <Button variant="success">Solved!</Button>}
  </>
)

export default GameStatus
