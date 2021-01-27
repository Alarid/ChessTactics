type Tactic = {
  id: string
  fen: string
  blunderMove: string
  solution: string[]
}

type Hint = 'sideToPlay' | 'incorrect' | 'correct' | 'solved'

type TacticHistory = {
  turn: number
  move: string
}

type Player = {
  name: string
  elo: number
}

type TacticInfos = {
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
