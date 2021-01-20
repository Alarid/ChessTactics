import React from 'react'

type Props = {
  side: 'b' | 'w'
  name: string
  elo: number
}

const PlayerInfos: React.FC<Props> = ({ side, name, elo }) => {
  return (
    <p className="mt-2 mb-1 text-left">
      <strong>{side === 'b' ? 'Black' : 'White'}</strong>
      <br />
      {name} ({elo})
    </p>
  )
}

export default PlayerInfos
