import { PlaygroundUtils } from "../playground/PlaygroundUtils";
import { ResolveMove } from "../types/ResolveMove";
import { MoveStrategy } from "./MoveStrategy";

export class PlayerMoveStrategy implements MoveStrategy {
	public performMove(checkIfFieldHasShip: (row: number, column: number) => boolean, resolveMove: ResolveMove) {
		this.checkIfFieldHasShip = checkIfFieldHasShip;
		this.resolveMove = resolveMove;

		const playground = document.querySelector(".computer-playground");
		const fields = playground?.getElementsByClassName("playground-field");

		if (fields && fields.length) {
			for (let i = 0; i < fields.length; i++) {
				const wasHit = fields[i].classList.contains("hit_field") || fields[i].classList.contains("misplaced_field");
				if (!wasHit) fields[i].addEventListener("click", this.playerMove);
			}
		}
	}

	private checkIfFieldHasShip: (row: number, column: number) => boolean = (row: number, column: number) => false;

	private resolveMove: ResolveMove = () => {};

	private playerMove = (e: Event) => {
		const field = e.target as HTMLElement;
		const { row, column } = PlaygroundUtils.getRowAndColumnNumberFromClassName(field.classList[1]);

		this.checkIfFieldHasShip(row, column) ? field.classList.add("hit_field") : field.classList.add("misplaced_field");
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
