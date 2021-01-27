import React, { useState, useEffect } from 'react'
import { Crosshair, Heart, MessageCircle, ThumbsDown, ThumbsUp } from 'react-feather'
import styled from 'styled-components/macro'
import { transparentize } from 'polished'
import { fetchTacticInfos } from 'src/services/fetchTactic'
import { FakeInfo } from 'src/styles/placeholder'

// Props
type Props = {
  id: string
  registerPlayers: (black: Player, white: Player) => void
}

// Container
const Container = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: start;
  margin-right: 15px;
  margin-top: 50px;
`

// Info block
const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
  color: rgb(41, 41, 41);

  &:hover {
    color: ${transparentize(0.5, 'rgb(41, 41, 41)')};
  }

  span {
    margin-left: 10px;
  }
`

// Game infos component
// Show informations about current blunder
// (elo, number of likes, dislikes and comments)
const GameInfos: React.FC<Props> = ({ id, registerPlayers }) => {
  const [infos, setInfos] = useState<TacticInfos>()

  // Fetch infos on component mount
  useEffect(() => {
    loadInfos()
  }, [])

  // Fetch game infos from API
  const loadInfos = async () => {
    const data = await fetchTacticInfos(id)
    if (data) {
      setInfos(data)
      registerPlayers(data.players.black, data.players.white)
    }
  }

  // Render an information value, or fake data
  // if informations haven't been fetched yet
  const renderInfo = (info: number | undefined) => {
    if (typeof info !== 'undefined') return <span>{info}</span>
    return <FakeInfo>1234</FakeInfo>
  }

  // Render
  return (
    <Container>
      <div className="d-flex flex-column">
        <Info>
          <Crosshair />
          {renderInfo(infos?.elo)}
        </Info>
        <Info>
          <Heart />
          {renderInfo(infos?.favorites)}
        </Info>
        <Info>
          <ThumbsUp />
          {renderInfo(infos?.likes)}
        </Info>
        <Info>
          <ThumbsDown />
          {renderInfo(infos?.dislikes)}
        </Info>
        <Info>
          <MessageCircle />
          {renderInfo(infos?.comments.length)}
        </Info>
      </div>
    </Container>
  )
}

export default GameInfos
