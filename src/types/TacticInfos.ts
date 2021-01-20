export type Player = {
  name: string
  elo: number
}

export type TacticInfos = {
  comments: string[]
  likes: number
  dislikes: number
  favorites: 0
  elo: number
  players: {
    black: Player
    white: Player
  }
}
