import React from 'react'
import styled from 'styled-components/macro'

import TacticHistory from 'src/types/TacticHistory'
import { transparentize } from 'polished'

type Props = {
  history: TacticHistory[]
}

const Container = styled.div`
  border-top: 1px solid ${transparentize(0.8, 'black')};
  padding-top: 10px;
`

const Line = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`

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
