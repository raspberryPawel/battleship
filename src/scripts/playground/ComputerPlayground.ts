import { GameOptions } from "../GameOptions";
import { Playground } from "./Playground";
import { Ship } from "../classes/Ship";
import { PlayerPlaygroundUtils } from "./PlayerPlaygroundUtils";

export class ComputerPlayground extends Playground {
	public playgroundShips: Ship[] = [];
	protected shipsOnPlaygrund: number = 0;

	constructor() {
		super();
		this.prepareComputerShips();
		this.preparePlaygroundDOMStructure();
		this.randomizeComputerShips();
		console.log("computer => ", JSON.stringify(this.playground));
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

	protected randomizeComputerShips = () => {
		while (this.shipsOnPlaygrund < this.playgroundShips.length) {
			const { doesSelectedFieldsEmpty, doesSelectedNearbyFieldsEmpty } = PlayerPlaygroundUtils;

			const ship = this.playgroundShips[this.shipsOnPlaygrund];
			const row = Math.floor(Math.random() * 10);
			const column = Math.floor(Math.random() * 10);

			if (ship.size + column <= GameOptions.playgroundFieldsCount) {
				const data = {
					playground: this.playground,
					currentCheckedRow: row,
					firstColumn: column,
					lastColumn: ship.size + column,
				};

				if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data))
					this.setShipOnPlayground(column, ship.size + column, row);
			} else {
				const data = {
					playground: this.playground,
					currentCheckedRow: column,
					firstColumn: GameOptions.playgroundFieldsCount - ship.size,
					lastColumn: GameOptions.playgroundFieldsCount,
				};

				if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data))
					this.setShipOnPlayground(GameOptions.playgroundFieldsCount - ship.size, GameOptions.playgroundFieldsCount, row);
			}
		}
	};

	protected setShipOnPlayground(firstIndex: number, lastIndex: number, currentRow: number): void {
		for (let i = firstIndex; i < lastIndex; i++) {
			this.playground[currentRow][i] = 1;
		}

		this.shipsOnPlaygrund++;
	}
}
