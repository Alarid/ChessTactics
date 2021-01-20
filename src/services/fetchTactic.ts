import axios from 'axios'
import TacticInfos from 'src/types/TacticInfos'
import Tactic from '../types/Tactic'

const API_URL = process.env.REACT_APP_CHESSBLUNDERS_API

export const fetchTactic = async (): Promise<Tactic | null> => {
  try {
    const res = await axios.post(`${API_URL}/blunder/get`, {
      type: 'explore',
    })
    const data = res.data.data
    return {
      id: data.id,
      fen: data.fenBefore,
      blunderMove: data.blunderMove,
      solution: data.forcedLine,
    }
  } catch (err) {
    console.error('REQUEST BLUNDER GET', err)
    return null
  }
}

export const fetchTacticInfos = async (blunderId: string): Promise<TacticInfos | null> => {
  try {
    const res = await axios.post(`${API_URL}/blunder/info`, {
      blunder_id: blunderId,
    })
    const data = res.data.data
    return {
      ...data,
      players: {
        black: {
          name: data['game-info'].Black,
          elo: data['game-info'].BlackElo,
        },
        white: {
          name: data['game-info'].White,
          elo: data['game-info'].WhiteElo,
        },
      },
    }
  } catch (err) {
    console.error('REQUEST BLUNDER INFOS', err)
    return null
  }
}
