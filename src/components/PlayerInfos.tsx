import React from 'react'
import { Card } from 'react-bootstrap'

type Props = {
  side: 'b' | 'w'
  name: string
  elo: number
}

const PlayerInfos: React.FC<Props> = ({ side, name, elo }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex flex-column">
          <strong>{side === 'b' ? 'Black' : 'White'}</strong>
          <span>{name}</span>
          <span>({elo})</span>
        </div>
      </Card.Body>
    </Card>
  )
}

export default PlayerInfos
