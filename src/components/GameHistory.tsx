import React from 'react'
import styled from 'styled-components/macro'
import { transparentize } from 'polished'

// Props
type Props = {
  history: TacticHistory[]
}

// container
const Container = styled.div`
  border-top: 1px solid ${transparentize(0.8, 'black')};
  padding-top: 10px;
`

// History line: show last move
const Line = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`

// Game history component
// Shows an history of moves for the current game
const GameHistory: React.FC<Props> = ({ history }) => {
  return (
    <Container>
      {history.map((line, idx) => (
        <Line key={idx}>
          <span className="mr-2">{line.turn}.</span>
          <strong>{line.move}</strong>
        </Line>
      ))}
    </Container>
  )
}

export default GameHistory
