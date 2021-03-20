import { GameOptions } from "../GameOptions";
import { Ship } from "../classes/Ship";
import { PlayerPlaygroundUtils } from "./PlayerPlaygroundUtils";

export abstract class Playground {
	public playgroundDOM: HTMLElement = document.createElement("div");
	public playground: number[][] = [];
	public playgroundShips: Ship[] = [];

	protected showShipsOnPlayground: boolean = true;
	protected shipsOnPlaygrund: number = 0;
	protected tempHighlightedFields: string[] = [];

	constructor() {
		this.preparePlayground();
	}

	protected preparePlayground() {
		for (let i = 0; i < GameOptions.playgroundFieldsCount; i++) {
			const fields: number[] = new Array(GameOptions.playgroundFieldsCount).fill(0);
			this.playground.push(fields);
		}
	}

	protected abstract preparePlaygroundDOMStructure(): void;
	protected abstract getPlaygroundClassName(row: number, column: number): string;

	protected randomizeShipsPositions = () => {
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
					currentCheckedRow: row,
					firstColumn: GameOptions.playgroundFieldsCount - ship.size,
					lastColumn: GameOptions.playgroundFieldsCount,
				};

				if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data))
					this.setShipOnPlayground(
						GameOptions.playgroundFieldsCount - ship.size,
						GameOptions.playgroundFieldsCount,
						row
					);
			}
		}
	};

	protected setShipOnPlayground(firstIndex: number, lastIndex: number, currentRow: number): void {
		for (let i = firstIndex; i < lastIndex; i++) {
			this.playground[currentRow][i] = 1;

			if(this.showShipsOnPlayground){
				const field: HTMLElement | null = this.playgroundDOM.querySelector(this.getPlaygroundClassName(currentRow, i));
				if (field) {
					field.classList.add("field-with-gradient");
					GameOptions.currentSelectedShip?.addField(`${currentRow}_${i}`);
				}
			}
		}

		this.shipsOnPlaygrund++;
	}

	protected clearPlayground() {
		this.playground.forEach((row, rowIndex) => {
			row.forEach((field, fieldIndex) => {
				field = 0;
				this.playground[rowIndex][fieldIndex] = 0;
				const div: HTMLElement | null = this.playgroundDOM.querySelector(
					this.getPlaygroundClassName(rowIndex, fieldIndex)
				);
				if (div) {
					div.classList.remove("field-with-gradient");
				}
			});
		});

		this.playgroundShips.forEach((ship) => {
			ship.clearFields();
		});

		this.shipsOnPlaygrund = 0;
	}
}
