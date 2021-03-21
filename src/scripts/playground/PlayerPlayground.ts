import { GameOptions } from "../GameOptions";
import { Playground } from "./Playground";
import { Ship } from "../classes/Ship";
import { PlayerPlaygroundUtils } from "./PlayerPlaygroundUtils";

export class PlayerPlayground extends Playground {
	protected tempHighlightedFields: string[] = [];
	protected playgroundClassPrefix: string = "player-playground";

	public playgroundShips: Ship[] = [];

	constructor() {
		super();

		this.preparePlayerShips();
		this.preparePlaygroundDOMStructure();
		this.addEventsOnPlayerPlayground();
	}

	public arePlaygroundReady(): boolean {
		return this.shipsOnPlaygrundCount === GameOptions.availableShips.length;
	}

	public randomizeShipsPosition = () => {
		this.clearPlayground();
		this.randomizeShipsPositions();
		this.hideShips();
		this.showButtonPlay();
	};

	protected addListenerOnPlaygroundField = (div: HTMLElement) => {
		div.addEventListener("mouseenter", this.hoverOnPlaygroundField);
	};

	protected hideShips() {
		this.playgroundShips.forEach((ship) => ship.hideShip());
	}

	// public rebuildPlaygroundDOMStructure = (playgroundSize?: number) => {
	// 	this.playgroundSize = playgroundSize ? playgroundSize : GameOptions.playgroundSize;
	// 	this.fieldSize = playgroundSize ? playgroundSize / GameOptions.playgroundFieldsCount - 4 : GameOptions.fieldSize;

	// 	this.playgroundDOM = document.createElement("div");
	// 	this.preparePlaygroundDOMStructure();

	// 	this.playground.forEach((row, rowIndex) => {
	// 		row.forEach((column, columnIndex) => {
	// 			if (column === 1) {
	// 				const className = this.getPlaygroundFieldClassName(rowIndex, columnIndex);
	// 				const element: HTMLElement | null = this.playgroundDOM.querySelector(className);

	// 				if (element) {
	// 					element.classList.add("field-with-gradient");
	// 					GameOptions.currentSelectedShip?.addField(className);
	// 				}
	// 			}
	// 		});
	// 	});
	// };

	private preparePlayerShips() {
		GameOptions.availableShips.forEach((shipSize) => {
			const ship = new Ship(shipSize, this.addShipToPlayground);
			this.playgroundShips.push(ship);
		});
	}

	protected addShipToPlayground = () => {
		this.shipsOnPlaygrundCount++;
		this.showButtonPlay();
	};

	protected showButtonPlay = () => {
		if (this.arePlaygroundReady()) {
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
					currentCheckedRow: row,
					firstColumn: GameOptions.playgroundFieldsCount - shipSize,
					lastColumn: GameOptions.playgroundFieldsCount,
				};

				if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data))
					this.highlightCorrectShipFields(
						GameOptions.playgroundFieldsCount - shipSize,
						GameOptions.playgroundFieldsCount,
						row
					);
				else
					this.highlightIncorrectShipFields(
						GameOptions.playgroundFieldsCount - shipSize,
						GameOptions.playgroundFieldsCount,
						row
					);
			}
		}
	};

	protected highlightCorrectShipFields(firstIndex: number, lastIndex: number, currentRow: number): void {
		for (let i = firstIndex; i < lastIndex; i++) {
			const className = this.getPlaygroundFieldClassName(currentRow, i);
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
				const className = this.getPlaygroundFieldClassName(currentRow, i);
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
			const element: HTMLElement | null = document.querySelector(`.${this.playgroundClassPrefix}-${className}`);
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
