import React from 'react'
import { Button } from 'react-bootstrap'
import { ArrowRight, RefreshCw } from 'react-feather'
import styled from 'styled-components/macro'

import GameStatus from './GameStatus'

// Props
type Props = {
  hint: Hint
  whiteTurn: boolean
  onClickRestart: () => void
  onClickNext: () => void
}

// Area for the game controls (restart, next, ...)
const Container = styled.div`
  width: 100%;
  margin: 30px auto 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

// Control Strip Component
const ControlStrip: React.FC<Props> = ({ hint, whiteTurn, onClickRestart, onClickNext }) => {
  return (
    <Container>
      <Button variant="light" onClick={onClickRestart}>
        <RefreshCw className="mr-1" /> Restart
      </Button>
      <GameStatus hint={hint} whiteTurn={whiteTurn} />
      <Button variant="light" onClick={onClickNext}>
        Next <ArrowRight className="ml-1" />
      </Button>
    </Container>
  )
}

export default ControlStrip
