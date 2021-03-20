import { GameOptions } from "../GameOptions";
import { Playground } from "./Playground";
import { Ship } from "../classes/Ship";
import { PlayerPlaygroundUtils } from "./PlayerPlaygroundUtils";

export class ComputerPlayground extends Playground {
	public playgroundShips: Ship[] = [];
	protected shipsOnPlaygrund: number = 0;
	protected showShipsOnPlayground: boolean = false;

	constructor() {
		super();
		this.prepareComputerShips();
		this.preparePlaygroundDOMStructure();
		this.randomizeShipsPosition();
	}

	public randomizeShipsPosition = () => {
		this.clearPlayground();
		this.randomizeShipsPositions();
	};

	protected getPlaygroundClassName(row: number, column: number): string {
		return `.computer-playground-${row}_${column}`;
	}

	protected preparePlaygroundDOMStructure(): void {
		this.playgroundDOM.setAttribute("class", "playground computer-playground");
		this.playgroundDOM.style.width = `${GameOptions.playgroundSize}px`;
		this.playgroundDOM.style.height = `${GameOptions.playgroundSize}px`;

		this.playground.forEach((row, rowIndex) => {
			const rowDiv: HTMLElement = document.createElement("div");
			rowDiv.setAttribute("class", `playground-row`);
			rowDiv.style.height = `${GameOptions.fieldSize + 4}px`;

			row.forEach((field, fieldIndex) => {
				const div: HTMLElement = document.createElement("div");
				div.style.width = `${GameOptions.fieldSize}px`;
				div.style.height = `${GameOptions.fieldSize}px`;

				div.setAttribute("class", `playground-field computer-playground-${rowIndex}_${fieldIndex}`);

				rowDiv.appendChild(div);
			});

			this.playgroundDOM.appendChild(rowDiv);
		});
	}

	private prepareComputerShips() {
		GameOptions.availableShips.forEach((shipSize) => {
			const ship = new Ship(shipSize);
			this.playgroundShips.push(ship);
		});
	}
}
