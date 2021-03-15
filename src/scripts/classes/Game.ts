import { PlayerPlaygroundUtils } from "../playground/PlayerPlaygroundUtils";
import { PlayerMoveStrategy } from "../moveStrategies/PlayerMoveStrategy";
import { ResolveMove } from "../types/ResolveMove";

enum MoveType {
	computerMove,
	playerMove,
}

export class Game {
	private playerPlayground: number[][];
	private computerPlayground: number[][];

	private playerMoveStrategy: PlayerMoveStrategy;

	private move: MoveType = MoveType.playerMove;
	private gameInProgress: boolean;

	private resolveMove: ResolveMove = () => {};

	constructor(playerPlayground: number[][], computerPlayground: number[][], playerMoveStrategy: PlayerMoveStrategy) {
		this.playerPlayground = playerPlayground;
		this.computerPlayground = computerPlayground;
		this.playerMoveStrategy = playerMoveStrategy;
		this.gameInProgress = true;
	}

	public async startGame() {
		this.move = MoveType.playerMove;
		this.game();
	}

	private nextMove() {
		this.move = this.move === MoveType.computerMove ? MoveType.playerMove : MoveType.computerMove;
	}

	private async game() {
		await new Promise((resolve) => {
			this.resolveMove = resolve;
			this.performMove();
		});

		this.nextMove();
		this.game();
	}

	private performMove() {
		this.move === MoveType.computerMove
			? this.performComputerMove()
			: this.playerMoveStrategy.performMove(this.computerPlayground, this.resolveMove);
	}

	private performComputerMove() {
		const row = Math.floor(Math.random() * 10);
		const column = Math.floor(Math.random() * 10);
		const field = document.querySelector(`.playground-${row}_${column}`) as HTMLElement;

		if (this.playerPlayground[row][column] === 1) {
			field.classList.add("hit_field");
		} else {
			field.classList.add("misplaced_field");
		}

		this.resolveMove(true);
	}
}
