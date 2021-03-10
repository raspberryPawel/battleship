import { Game } from "../Game";
import { Playground } from "./Playground";
import { Ship } from "../Ship";
import { PlayerPlaygroundUtils } from "./PlayerPlaygroundUtils";

export class PlayerPlayground extends Playground {
	public playgroundShips: Ship[] = [];

	constructor() {
		super();
		this.preparePlayerShips();

		this.preparePlaygroundDOMStructure();
		this.addEventsOnPlayerPlayground();
	}

	protected preparePlaygroundDOMStructure(): void {
		this.playgroundDOM.setAttribute("class", "playground");
		this.playgroundDOM.style.width = `${Game.playgroundSize}px`;
		this.playgroundDOM.style.height = `${Game.playgroundSize}px`;

		this.playground.forEach((row, rowIndex) => {
			const rowDiv: HTMLElement = document.createElement("div");
			rowDiv.setAttribute("class", `playground-row`);
			rowDiv.style.height = `${Game.fieldSize + 4}px`;

			row.forEach((field, fieldIndex) => {
				const div: HTMLElement = document.createElement("div");
				div.style.width = `${Game.fieldSize}px`;
				div.style.height = `${Game.fieldSize}px`;

				div.setAttribute("class", `playground-field playground-${rowIndex}_${fieldIndex}`);
				div.addEventListener("mouseenter", this.hoverOnPlaygroundField);
				rowDiv.appendChild(div);
			});

			this.playgroundDOM.appendChild(rowDiv);
		});
	}

	private preparePlayerShips() {
		Game.availableShips.forEach((shipSize) => {
			const ship = new Ship(shipSize);
			this.playgroundShips.push(ship);
		});
	}

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
		if (Game.currentSelectedShip) Game.currentSelectedShip.shipElement.style.opacity = "0";
	};

	protected playgroundMouseLeave = () => {
		if (Game.currentSelectedShip) {
			Game.currentSelectedShip.shipElement.style.opacity = "1";
			Game.currentlySelectedField = null;
			this.clearShipFields();
		}
	};

	protected hoverOnPlaygroundField = (e: MouseEvent): void => {
		const {
			doesSelectedFieldsEmpty,
			doesSelectedNearbyFieldsEmpty,
			getRowAndColumnNumberFromClassName,
		} = PlayerPlaygroundUtils;

		const shipSize = Game.currentSelectedShip?.size || -1;
		const fieldClassName: string = (e.target as HTMLElement).classList[1];
		const rowAndColumnIndex = getRowAndColumnNumberFromClassName(fieldClassName);
		const { row, column } = rowAndColumnIndex;
		Game.currentlySelectedField = rowAndColumnIndex;

		this.clearShipFields();

		if (shipSize > 0) {
			if (shipSize + column <= Game.playgroundFieldsCount) {
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
					firstColumn: Game.playgroundFieldsCount - shipSize,
					lastColumn: Game.playgroundFieldsCount,
				};

				if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data))
					this.highlightCorrectShipFields(Game.playgroundFieldsCount - shipSize, Game.playgroundFieldsCount, row);
				else this.highlightIncorrectShipFields(Game.playgroundFieldsCount - shipSize, Game.playgroundFieldsCount, row);
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
				Game.currentSelectedShip?.addField(className);
			}
		}
	}

	protected highlightIncorrectShipFields(firstIndex: number, lastIndex: number, currentRow: number): void {
		Game.currentlySelectedField = null;

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

		Game.currentSelectedShip?.shipOnPlayground.forEach((className) => {
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
		Game.currentSelectedShip?.clearFields();
	}

	protected clearPlaygroundFields(): void {
		Game.currentSelectedShip?.shipOnPlayground.forEach((className: string) => {
			const { row, column } = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(className);
			this.playground[row][column] = 0;
		});
	}
}
