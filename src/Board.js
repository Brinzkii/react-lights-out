import React, { useState } from "react";
import Cell from "./Cell";
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: number between 0 - 100
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
	const initialBoard = createBoard();
	const [board, setBoard] = useState(initialBoard);

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	function createBoard() {
		let initialBoard = [];
		let counter = 0;
		while (counter < nrows) {
			initialBoard.push(Array(ncols));
			counter++;
		}

		initialBoard.forEach((row) => {
			let counter = 0;
			while (counter < row.length) {
				if (Math.random() * 100 <= chanceLightStartsOn) {
					row[counter] = true;
				} else {
					row[counter] = false;
				}
				counter++;
			}
		});

		return initialBoard;
	}

	function hasWon() {
		let result = true;
		for (let i = 0; i < board.length; i++) {
			if (board[i].find((val) => val === true)) result = false;
		}

		return result;
	}

	function flipCellsAround(coord) {
		setBoard((oldBoard) => {
			const [y, x] = coord.split('-').map(Number);

			const flipCell = (y, x, boardCopy) => {
				// if this coord is actually on board, flip it

				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					boardCopy[y][x] = !boardCopy[y][x];
				}
			};

			// TODO: Make a (deep) copy of the oldBoard
			let boardCopy = oldBoard.map((row) => {
				return row.map((cell) => {
					return cell;
				});
			});

			flipCell(y, x, boardCopy);
			flipCell(y - 1, x, boardCopy);
			flipCell(y + 1, x, boardCopy);
			flipCell(y, x - 1, boardCopy);
			flipCell(y, x + 1, boardCopy);

			return boardCopy;
		});
	}

	// if the game is won, just show a winning msg & render nothing else

	if (hasWon()) return <h1 className="winMsg">You won, great job!</h1>;

	// make table board

	return (
		<>
			<h1 className="Board-title">Turn all the lights off!</h1>
			<table className="Board">
				<tbody className="Board-body">
					{board.map((row, rIdx) => {
						return (
							<tr className="Board-row" key={rIdx}>
								{row.map((c, cIdx) => {
									return (
										<Cell
											flipCellsAroundMe={() => flipCellsAround(`${rIdx}-${cIdx}`)}
											isLit={c}
											key={`${rIdx}-${cIdx}`}
											pos={`${rIdx}-${cIdx}`}
										/>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

Board.defaultProps = {
	nrows: 4,
	ncols: 4,
	chanceLightStartsOn: 50,
};

export default Board;
