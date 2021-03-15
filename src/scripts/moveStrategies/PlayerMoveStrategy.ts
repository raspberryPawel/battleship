import { PlayerPlaygroundUtils } from "../playground/PlayerPlaygroundUtils";
import { ResolveMove } from "../types/ResolveMove";
import { MoveStrategy } from "./MoveStrategy";

export class PlayerMoveStrategy implements MoveStrategy {
	private enemyPlayground: number[][] = [];
	private resolveMove: ResolveMove = () => {};

	public performMove = (enemyPlayground: number[][], resolveMove: ResolveMove) => {
		this.resolveMove = resolveMove;
		this.enemyPlayground = enemyPlayground;

		const playground = document.querySelector(".computer-playground");
		const fields = playground?.getElementsByClassName("playground-field");

		if (fields && fields.length) {
			for (let i = 0; i < fields.length; i++) {
				fields[i].addEventListener("click", this.playerMove);
			}
		}
	};

	private playerMove = (e: Event) => {
		const field = e.target as HTMLElement;
		const className = field.classList[1];
		const { row, column } = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(className);
        
		if (this.enemyPlayground[row][column] === 1) {
			field.classList.add("hit_field");
		} else {
			field.classList.add("misplaced_field");
		}

		this.unregisterPlayerMove();
		this.resolveMove(true);
	};

	private unregisterPlayerMove() {
		const playground = document.querySelector(".computer-playground");
		const fields = playground?.getElementsByClassName("playground-field");

		if (fields && fields.length) {
			for (let i = 0; i < fields.length; i++) {
				fields[i].removeEventListener("click", this.playerMove);
			}
		}
	}
}
