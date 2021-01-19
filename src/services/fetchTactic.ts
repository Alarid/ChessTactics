import axios from 'axios'
import Tactic from '../types/Tactic'

export const fetchTactic = async (): Promise<Tactic> => {
  const res = await axios.post(`${process.env.REACT_APP_CHESSBLUNDERS_API}/blunder/get`, {
    type: 'explore',
  })
  const data = res.data.data
  return {
    id: data.id,
    fen: data.fenBefore,
    blunderMove: data.blunderMove,
    solution: data.forcedLine,
  }
}
