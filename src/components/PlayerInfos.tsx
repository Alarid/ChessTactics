import React from 'react'
import { Card } from 'react-bootstrap'
import { FakeInfo } from 'src/styles/placeholder'

// Props
type Props = {
  side: 'b' | 'w'
  name?: string
  elo?: number
}

// Player informations: color, name and elo
const PlayerInfos: React.FC<Props> = ({ side, name, elo }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex flex-column">
          <strong>{side === 'b' ? 'Black' : 'White'}</strong>
          {name ? <span>{name}</span> : <FakeInfo>Suta, Andraz</FakeInfo>}
          {elo ? <span>({elo})</span> : <FakeInfo>(2245)</FakeInfo>}
        </div>
      </Card.Body>
    </Card>
  )
}

export default PlayerInfos
