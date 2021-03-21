import { GameOptions } from "../GameOptions";
import { Ship } from "../Ship";
import { PlayerPlaygroundUtils } from "./PlayerPlaygroundUtils";

export abstract class Playground {
	public playgroundDOM: HTMLElement = document.createElement("div");
	public playground: number[][] = [];
	public playgroundShips: Ship[] = [];

	protected playgroundSizeInPx: number;
	protected fieldSizeInPx: number;
	protected showShipsOnPlayground: boolean = true;
	protected shipsOnPlaygrundCount: number = 0;
	protected abstract playgroundClassPrefix: string = "";

	constructor(playgroundSize?: number) {
		this.playgroundSizeInPx = playgroundSize ? playgroundSize : GameOptions.playgroundSize;
		this.fieldSizeInPx = playgroundSize
			? playgroundSize / GameOptions.playgroundFieldsCount - 4
			: GameOptions.fieldSize;

		this.preparePlayground();
	}

	public changePlaygroundSize = (playgroundSizeInPx: number) => {
		this.playgroundSizeInPx = playgroundSizeInPx ? playgroundSizeInPx : GameOptions.playgroundSize;
		this.fieldSizeInPx = playgroundSizeInPx
			? playgroundSizeInPx / GameOptions.playgroundFieldsCount - 4
			: GameOptions.fieldSize;

		this.playgroundDOM.style.width = `${this.playgroundSizeInPx}px`;
		this.playgroundDOM.style.height = `${this.playgroundSizeInPx}px`;

		const fields = this.playgroundDOM.querySelectorAll(".playground-field") as NodeListOf<HTMLElement>;
		fields.forEach((field: HTMLElement) => {
			field.style.width = `${this.fieldSizeInPx}px`;
			field.style.height = `${this.fieldSizeInPx}px`;
			field.style.fontSize = `${this.fieldSizeInPx / 2}px`;
		});

		const rows = this.playgroundDOM.querySelectorAll(".playground-row") as NodeListOf<HTMLElement>;
		rows.forEach((row: HTMLElement) => {
			row.style.height = `${this.fieldSizeInPx + 4}px`;
		});

		this.playgroundShips.forEach((ship: Ship) => {
			ship.shipElement.style.width = `${this.fieldSizeInPx * ship.size + ship.size * 2}px`;
			ship.shipElement.style.height = `${this.fieldSizeInPx}px`;

			const fields = ship.shipElement.querySelectorAll(".ship_field") as NodeListOf<HTMLElement>;
			fields.forEach((field: HTMLElement) => {
				field.style.width = `${this.fieldSizeInPx}px`;
				field.style.height = `${this.fieldSizeInPx}px`;
			});
		});
	};

	protected preparePlayground() {
		for (let i = 0; i < GameOptions.playgroundFieldsCount; i++) {
			const fields: number[] = new Array(GameOptions.playgroundFieldsCount).fill(0);
			this.playground.push(fields);
		}
	}

	protected abstract addListenerOnPlaygroundField = (div: HTMLElement): void => {};
	protected getPlaygroundFieldClassName(row: number, column: number): string {
		return `.${this.playgroundClassPrefix}-${row}_${column}`;
	}

	protected preparePlaygroundDOMStructure(): void {
		this.playgroundDOM.setAttribute("class", `playground ${this.playgroundClassPrefix}`);
		this.playgroundDOM.style.width = `${this.playgroundSizeInPx}px`;
		this.playgroundDOM.style.height = `${this.playgroundSizeInPx}px`;

		this.playground.forEach((row, rowIndex) => {
			const rowDiv: HTMLElement = document.createElement("div");

			rowDiv.setAttribute("class", `playground-row`);
			rowDiv.style.height = `${this.fieldSizeInPx + 4}px`;

			row.forEach((field, fieldIndex) => {
				const div: HTMLElement = document.createElement("div");
				div.style.width = `${this.fieldSizeInPx}px`;
				div.style.height = `${this.fieldSizeInPx}px`;
				div.style.fontSize = `${this.fieldSizeInPx / 2}px`;

				div.setAttribute("class", `playground-field ${this.playgroundClassPrefix}-${rowIndex}_${fieldIndex}`);
				this.addListenerOnPlaygroundField(div);

				rowDiv.appendChild(div);
			});

			this.playgroundDOM.appendChild(rowDiv);
		});
	}

	protected randomizeShipsPositions = () => {
		GameOptions.currentlySelectedField = null;

		while (this.shipsOnPlaygrundCount < this.playgroundShips.length) {
			const ship = this.playgroundShips[this.shipsOnPlaygrundCount];
			const row = Math.floor(Math.random() * 10);
			const column = Math.floor(Math.random() * 10);

			this.setShipOnPlaygroundIfPossible(ship, row, column);
		}
	};

	protected setShipOnPlaygroundIfPossible = (ship: Ship, row: number, column: number) => {
		const { doesSelectedFieldsEmpty, doesSelectedNearbyFieldsEmpty } = PlayerPlaygroundUtils;
		GameOptions.currentlySelectedField = { row, column };

		if (ship.size + column <= GameOptions.playgroundFieldsCount) {
			const data = {
				playground: this.playground,
				currentCheckedRow: row,
				firstColumn: column,
				lastColumn: ship.size + column,
			};

			if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data)) {
				this.setShipOnPlayground(column, ship.size + column, row, ship);
			}
		} else {
			const data = {
				playground: this.playground,
				currentCheckedRow: row,
				firstColumn: GameOptions.playgroundFieldsCount - ship.size,
				lastColumn: GameOptions.playgroundFieldsCount,
				ship,
			};

			if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data)) {
				this.setShipOnPlayground(
					GameOptions.playgroundFieldsCount - ship.size,
					GameOptions.playgroundFieldsCount,
					row,
					ship
				);
			}
		}
	};

	protected setShipOnPlayground(firstIndex: number, lastIndex: number, currentRow: number, ship: Ship): void {
		for (let i = firstIndex; i < lastIndex; i++) {
			this.playground[currentRow][i] = 1;
			ship.addField(`${currentRow}_${i}`);

			if (this.showShipsOnPlayground) {
				const field: HTMLElement | null = this.playgroundDOM.querySelector(
					this.getPlaygroundFieldClassName(currentRow, i)
				);

				if (field) {
					field.classList.add("field-with-gradient");
				}
			}
		}

		ship.dropShip();
	}

	protected clearPlayground() {
		this.playground.forEach((row, rowIndex) => {
			row.forEach((field, fieldIndex) => {
				field = 0;
				this.playground[rowIndex][fieldIndex] = 0;
				const div: HTMLElement | null = this.playgroundDOM.querySelector(
					this.getPlaygroundFieldClassName(rowIndex, fieldIndex)
				);
				if (div) {
					div.classList.remove("field-with-gradient");
				}
			});
		});

		this.playgroundShips.forEach((ship) => {
			ship.clearFields();
		});

		this.shipsOnPlaygrundCount = 0;
	}
}
