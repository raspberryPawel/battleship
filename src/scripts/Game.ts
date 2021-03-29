import { MoveType } from "./consts/MoveType";
import { GameOptions } from "./GameOptions";
import { PlayerMoveStrategy } from "./moveStrategies/PlayerMoveStrategy";
import { SimpleComputerMoveStrategy } from "./moveStrategies/SimpleComputerMoveStrategy";
import { PlaygroundType } from "./types/PlaygroundType";
import { ResolveMove } from "./types/ResolveMove";

export class Game {
	private playerPlayground: PlaygroundType;
	private computerPlayground: PlaygroundType;

	private playerMoveStrategy: PlayerMoveStrategy;
	private computerMoveStrategy: SimpleComputerMoveStrategy;

	private move: MoveType = MoveType.playerMove;

	private playerSunkFields: number = 0;
	private computerSunkFields: number = 0;

	private gameInProgress: boolean;
	private shipFieldsCount: number;

	private resolveMove: ResolveMove = () => {};

	constructor(
		playerPlayground: PlaygroundType,
		computerPlayground: PlaygroundType,
		playerMoveStrategy: PlayerMoveStrategy,
		computerMoveStrategy: SimpleComputerMoveStrategy
	) {
		this.playerPlayground = playerPlayground;
		this.computerPlayground = computerPlayground;
		this.playerMoveStrategy = playerMoveStrategy;
		this.computerMoveStrategy = computerMoveStrategy;

		this.gameInProgress = true;
		this.shipFieldsCount = GameOptions.availableShips.reduce((a, b) => a + b);
	}

	public async startGame() {
		this.move = MoveType.playerMove;
		this.game();
	}

	private async game() {
		if (this.gameInProgress) {
			await new Promise((resolve) => {
				this.resolveMove = resolve;
				this.performMove();
			});

			this.nextMove();
			this.game();
		}
	}

	private nextMove() {
		if (this.computerSunkFields === this.shipFieldsCount) {
			this.gameInProgress = false;
			alert("player won");
		}
		if (this.playerSunkFields === this.shipFieldsCount) {
			this.gameInProgress = false;
			alert("computer won");
		}

		this.move = this.move === MoveType.computerMove ? MoveType.playerMove : MoveType.computerMove;
	}

	private performMove() {
		this.move === MoveType.computerMove
			? this.computerMoveStrategy.performMove(this.checkIfFieldHasShip, this.resolveMove)
			: this.playerMoveStrategy.performMove(this.checkIfFieldHasShip, this.resolveMove);
	}

	private checkIfFieldHasShip = (row: number, column: number): boolean => {
		if (this.move === MoveType.computerMove && this.playerPlayground[row][column] === 1) {
			this.playerSunkFields++;
		}

		if (this.move === MoveType.playerMove && this.computerPlayground[row][column] === 1) {
			this.computerSunkFields++;
		}

		return this.move === MoveType.computerMove
			? this.playerPlayground[row][column] === 1
			: this.computerPlayground[row][column] === 1;
	};
}
