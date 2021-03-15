import { GameOptions } from "../GameOptions";
import { Playground } from "./Playground";
import { Ship } from "../classes/Ship";
import { PlayerPlaygroundUtils } from "./PlayerPlaygroundUtils";

export class PlayerPlayground extends Playground {
	protected playgroundSize: number;
	protected fieldSize: number;

	public playgroundShips: Ship[] = [];
	protected shipsOnPlaygrund: number = 0;

	constructor(playgroundSize?: number) {
		super();

		this.playgroundSize = playgroundSize ? playgroundSize : GameOptions.playgroundSize;
		this.fieldSize = playgroundSize ? playgroundSize / GameOptions.playgroundFieldsCount - 4 : GameOptions.fieldSize;

		this.preparePlayerShips();

		this.preparePlaygroundDOMStructure();
		this.addEventsOnPlayerPlayground();
	}

	protected preparePlaygroundDOMStructure(): void {
		this.playgroundDOM.setAttribute("class", "playground player-playground");
		this.playgroundDOM.style.width = `${this.playgroundSize}px`;
		this.playgroundDOM.style.height = `${this.playgroundSize}px`;

		this.playground.forEach((row, rowIndex) => {
			const rowDiv: HTMLElement = document.createElement("div");
			rowDiv.setAttribute("class", `playground-row`);
			rowDiv.style.height = `${this.fieldSize + 4}px`;

			row.forEach((field, fieldIndex) => {
				const div: HTMLElement = document.createElement("div");
				div.style.width = `${this.fieldSize}px`;
				div.style.height = `${this.fieldSize}px`;

				div.setAttribute("class", `playground-field playground-${rowIndex}_${fieldIndex}`);
				div.addEventListener("mouseenter", this.hoverOnPlaygroundField);
				rowDiv.appendChild(div);
			});

			this.playgroundDOM.appendChild(rowDiv);
		});
	}

	public rebuildPlaygroundDOMStructure = (playgroundSize?: number) => {
		this.playgroundSize = playgroundSize ? playgroundSize : GameOptions.playgroundSize;
		this.fieldSize = playgroundSize ? playgroundSize / GameOptions.playgroundFieldsCount - 4 : GameOptions.fieldSize;

		this.playgroundDOM = document.createElement("div");
		this.preparePlaygroundDOMStructure();

		this.playground.forEach((row, rowIndex) => {
			row.forEach((column, columnIndex) => {
				if (column === 1) {
					const className = `.playground-${rowIndex}_${columnIndex}`;
					const element: HTMLElement | null = this.playgroundDOM.querySelector(className);
					if (element) {
						element.classList.add("field-with-gradient");
						GameOptions.currentSelectedShip?.addField(className);
					}
				}
			});
		});
	};

	private preparePlayerShips() {
		GameOptions.availableShips.forEach((shipSize) => {
			const ship = new Ship(shipSize, this.addShipToPlayground);
			this.playgroundShips.push(ship);
		});
	}

	protected addShipToPlayground = () => {
		this.shipsOnPlaygrund++;

		if (this.shipsOnPlaygrund === GameOptions.availableShips.length) {
			const playButton: HTMLElement | null = document.querySelector(".btn-play");
			if (playButton) playButton.style.display = "block";
		}
	};

	public getShipsDOMElements(): HTMLElement[] {
		return this.playgroundShips.map((ship) => ship.shipElement);
	}

	protected addEventsOnPlayerPlayground() {
		this.playgroundDOM.addEventListener("mouseover", this.playgroundMouseOver);
		this.playgroundDOM.addEventListener("mouseleave", this.playgroundMouseLeave);
	}

	public removeEventsFromPlayerPlayground() {
		this.playgroundDOM.removeEventListener("mouseover", this.playgroundMouseOver);
		this.playgroundDOM.removeEventListener("mouseleave", this.playgroundMouseLeave);
	}

	protected playgroundMouseOver = () => {
		if (GameOptions.currentSelectedShip) GameOptions.currentSelectedShip.shipElement.style.opacity = "0";
	};

	protected playgroundMouseLeave = () => {
		if (GameOptions.currentSelectedShip) {
			GameOptions.currentSelectedShip.shipElement.style.opacity = "1";
			GameOptions.currentlySelectedField = null;
			this.clearShipFields();
		}
	};

	protected hoverOnPlaygroundField = (e: MouseEvent): void => {
		const {
			doesSelectedFieldsEmpty,
			doesSelectedNearbyFieldsEmpty,
			getRowAndColumnNumberFromClassName,
		} = PlayerPlaygroundUtils;

		const shipSize = GameOptions.currentSelectedShip?.size || -1;
		const fieldClassName: string = (e.target as HTMLElement).classList[1];
		const rowAndColumnIndex = getRowAndColumnNumberFromClassName(fieldClassName);
		const { row, column } = rowAndColumnIndex;
		GameOptions.currentlySelectedField = rowAndColumnIndex;

		this.clearShipFields();

		if (shipSize > 0) {
			if (shipSize + column <= GameOptions.playgroundFieldsCount) {
				const data = {
					playground: this.playground,
					currentCheckedRow: row,
					firstColumn: column,
					lastColumn: shipSize + column,
				};

				if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data))
					this.highlightCorrectShipFields(column, shipSize + column, row);
				else this.highlightIncorrectShipFields(column, shipSize + column, row);
			} else {
				const data = {
					playground: this.playground,
					currentCheckedRow: column,
					firstColumn: GameOptions.playgroundFieldsCount - shipSize,
					lastColumn: GameOptions.playgroundFieldsCount,
				};

				if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data))
					this.highlightCorrectShipFields(GameOptions.playgroundFieldsCount - shipSize, GameOptions.playgroundFieldsCount, row);
				else this.highlightIncorrectShipFields(GameOptions.playgroundFieldsCount - shipSize, GameOptions.playgroundFieldsCount, row);
			}
		}
	};

	protected highlightCorrectShipFields(firstIndex: number, lastIndex: number, currentRow: number): void {
		for (let i = firstIndex; i < lastIndex; i++) {
			const className = `.playground-${currentRow}_${i}`;
			this.playground[currentRow][i] = 1;
			const element: HTMLElement | null = document.querySelector(className);
			if (element) {
				element.classList.add("field-with-gradient");
				GameOptions.currentSelectedShip?.addField(className);
			}
		}
	}

	protected highlightIncorrectShipFields(firstIndex: number, lastIndex: number, currentRow: number): void {
		GameOptions.currentlySelectedField = null;

		for (let i = firstIndex; i < lastIndex; i++) {
			if (this.playground[currentRow][i] !== 1) {
				const className = `.playground-${currentRow}_${i}`;
				const element: HTMLElement | null = document.querySelector(className);

				if (element) {
					this.tempHighlightedFields.push(`${currentRow}_${i}`);
					element.classList.add("field-with-error-gradient");
				}
			}
		}
	}

	protected clearShipFields(): void {
		this.clearPlaygroundFields();

		GameOptions.currentSelectedShip?.shipOnPlayground.forEach((className) => {
			const element: HTMLElement | null = document.querySelector(className);
			if (element) {
				element.classList.remove("field-with-gradient");
			}
		});

		this.tempHighlightedFields.forEach((className) => {
			const element: HTMLElement | null = document.querySelector(`.playground-${className}`);
			if (element) {
				element.classList.remove("field-with-error-gradient");
			}
		});

		this.tempHighlightedFields.length = 0;
		GameOptions.currentSelectedShip?.clearFields();
	}

	protected clearPlaygroundFields(): void {
		GameOptions.currentSelectedShip?.shipOnPlayground.forEach((className: string) => {
			const { row, column } = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(className);
			this.playground[row][column] = 0;
		});
	}
}
