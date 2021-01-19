import { ChessInstance, Move, ShortMove } from 'chess.js'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Chess = require('chess.js')

export const getSideToPlayFromFen = (fen: string): 'b' | 'w' => {
  const chess: ChessInstance = new Chess(fen)
  return chess.turn()
}

export const makeMove = (
  fen: string,
  move: ShortMove | string
): { fullMove: Move; fen: string } | null => {
  const chess: ChessInstance = new Chess(fen)
  const fullMove = chess.move(move)
  return fullMove ? { fullMove, fen: chess.fen() } : null
}

export function validateMove(
  fen: string,
  move: ShortMove | string,
  solution: string[]
): null | { solution: string[]; fen: string } {
  if (solution.length === 0) {
    return null
  }

  const next = makeMove(fen, move)
  if (next && next.fullMove.san === solution[0]) {
    return {
      fen: next.fen,
      solution: solution.slice(1),
    }
  }

  return null
}
