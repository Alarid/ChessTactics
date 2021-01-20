import React, { useState, useEffect } from 'react'
import { Crosshair, Heart, MessageCircle, ThumbsDown, ThumbsUp } from 'react-feather'
import styled from 'styled-components/macro'
import { transparentize } from 'polished'
import { fetchTacticInfos } from 'src/services/fetchTactic'
import { Player, TacticInfos } from 'src/types/TacticInfos'

type Props = {
  id: string
  registerPlayers: (black: Player, white: Player) => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

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

const GameInfos: React.FC<Props> = ({ id, registerPlayers }) => {
  const [infos, setInfos] = useState<TacticInfos>()

  const loadInfos = async () => {
    const data = await fetchTacticInfos(id)
    if (data) {
      setInfos(data)
      registerPlayers(data.players.black, data.players.white)
    }
  }

  useEffect(() => {
    loadInfos()
  }, [])

  if (!infos) return <></>

  return (
    <Container>
      <Info>
        <Crosshair />
        <span>{infos.elo}</span>
      </Info>
      <Info>
        <Heart />
        <span>{infos.favorites}</span>
      </Info>
      <Info>
        <ThumbsUp />
        <span>{infos.likes}</span>
      </Info>
      <Info>
        <ThumbsDown />
        <span>{infos.dislikes}</span>
      </Info>
      <Info>
        <MessageCircle />
        <span>{infos.comments.length}</span>
      </Info>
    </Container>
  )
}

export default GameInfos
