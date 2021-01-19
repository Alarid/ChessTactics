import React from 'react'
import { Button } from 'react-bootstrap'

type Props = {
  hint: 'sideToPlay' | 'incorrect' | 'correct' | 'solved'
  whiteTurn: boolean
}

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
