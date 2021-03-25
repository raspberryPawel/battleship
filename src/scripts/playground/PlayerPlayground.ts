import { GameOptions } from "../GameOptions";
import { Playground } from "./Playground";
import { PlayerPlaygroundUtils } from "./PlayerPlaygroundUtils";
import { Ship } from "../Ship";
import { ShipDirection } from "../types/ShipDirection";

export class PlayerPlayground extends Playground {
	protected tempHighlightedFields: string[] = [];
	protected playgroundClassPrefix: string = "player-playground";

	public playgroundShips: Ship[] = [];

	constructor() {
		super();

		this.preparePlayerShips();
		this.preparePlaygroundDOMStructure();
		this.addListenersOnPlaygroundShips();
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

	public getShipsDOMElements(): HTMLElement[] {
		return this.playgroundShips.map((ship) => ship.shipElement);
	}

	protected addListenersOnPlaygroundShips = () => {
		this.playgroundShips.forEach((ship: Ship) => {
			ship;
		});
	};

	protected addListenerOnPlaygroundField = (div: HTMLElement) => {
		div.addEventListener("click", this.fieldClick);
		div.addEventListener("mouseenter", this.fieldMouseOver);
	};

	protected hideShips() {
		this.playgroundShips.forEach((ship) => ship.hideShip());
	}

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

	protected addEventsOnPlayerPlayground() {
		this.playgroundDOM.addEventListener("mouseover", this.playgroundMouseOver);
		this.playgroundDOM.addEventListener("mouseleave", this.playgroundMouseLeave);

		this.playgroundDOM.addEventListener("touchmove", this.fieldTouchMove, false);
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

	protected playgroundTouchEnd = () => {
		if (GameOptions.currentSelectedShip) {
			GameOptions.currentSelectedShip.shipElement.style.opacity = "1";
			GameOptions.currentSelectedShip.dropShip();

			this.clearShipFields();
		}
		this.playgroundDOM.removeEventListener("touchend", this.playgroundTouchEnd, false);
	};

	protected fieldMouseOver = (e: MouseEvent): void => {
		const fieldClassName: string = (e.target as HTMLElement).classList[1];
		this.highlightFields(fieldClassName);
	};

	protected fieldClick = (e: MouseEvent): void => {
		const { getRowAndColumnNumberFromClassName } = PlayerPlaygroundUtils;

		const fieldClassName: string = (e.target as HTMLElement).classList[1];
		const { row, column } = getRowAndColumnNumberFromClassName(fieldClassName);

		GameOptions.currentlySelectedField = { row, column };

		if (GameOptions.currentSelectedShip) {
			GameOptions.currentSelectedShipAfterClick?.shipElement.classList.remove("selected_ship");
			GameOptions.currentSelectedShipAfterClick = null;
			this.setShipOnPlaygroundIfPossible(
				GameOptions.currentSelectedShip,
				row,
				column,
				GameOptions.currentSelectedShip.direction
			);
		}
	};

	protected fieldTouchMove = (e: TouchEvent): void => {
		this.playgroundDOM.removeEventListener("touchend", this.playgroundTouchEnd, false);
		this.playgroundDOM.addEventListener("touchend", this.playgroundTouchEnd, false);

		const x = e.touches[0].clientX;
		const y = e.touches[0].clientY;
		let selectedField;
		const fields = this.playgroundDOM.querySelectorAll(".playground-field") as NodeListOf<HTMLElement>;
		fields.forEach((field: HTMLElement) => {
			var rect = field.getBoundingClientRect();
			if (x >= rect.left && x <= rect.right && y <= rect.bottom && y >= rect.top) selectedField = field;
		});

		if (selectedField) {
			const fieldClassName: string = (selectedField as HTMLElement).classList[1];
			this.highlightFields(fieldClassName);
		}
	};

	protected highlightFields = (fieldClassName: string): void => {

		const shipSize = GameOptions.currentSelectedShip?.size || -1;
		if (shipSize > 0) {
			return;
		}

		const { getRowAndColumnNumberFromClassName } = PlayerPlaygroundUtils;
		const shipDirection = GameOptions.currentSelectedShip?.direction;
		const rowAndColumnIndex = getRowAndColumnNumberFromClassName(fieldClassName);
		const { row, column } = rowAndColumnIndex;

		GameOptions.currentlySelectedField = rowAndColumnIndex;
		
		this.clearShipFields();

		shipDirection === ShipDirection.vertical
			? this.setShipVerticallyOnPlayground(shipSize, row, column)
			: this.setShipHorizontalyOnPlayground(shipSize, row, column);
	};

	protected setShipVerticallyOnPlayground(shipSize: number, row: number, column: number) {
		const { doesVerticalSelectedFieldsEmpty, doesVerticalSelectedNearbyFieldsEmpty } = PlayerPlaygroundUtils;

		if (shipSize + row <= GameOptions.playgroundFieldsCount - 1) {
			const data = {
				playground: this.playground,
				currentCheckedColumn: column,
				firstRow: row - 1,
				lastRow: shipSize + row,
			};

			if (doesVerticalSelectedFieldsEmpty(data) && doesVerticalSelectedNearbyFieldsEmpty(data)) {
				this.highlightVerticalyCorrectShipFields(row, shipSize + row, column);
			} else this.highlightVerticalyIncorrectShipFields(row, shipSize + row, column);
		} else {
			const data = {
				playground: this.playground,
				currentCheckedColumn: column,
				firstRow: GameOptions.playgroundFieldsCount - shipSize,
				lastRow: GameOptions.playgroundFieldsCount,
			};

			if (doesVerticalSelectedFieldsEmpty(data) && doesVerticalSelectedNearbyFieldsEmpty(data)) {
				this.highlightVerticalyCorrectShipFields(
					GameOptions.playgroundFieldsCount - shipSize,
					GameOptions.playgroundFieldsCount,
					column
				);
			} else
				this.highlightVerticalyIncorrectShipFields(
					GameOptions.playgroundFieldsCount - shipSize,
					GameOptions.playgroundFieldsCount,
					column
				);
		}
	}

	protected setShipHorizontalyOnPlayground(shipSize: number, row: number, column: number) {
		const { doesSelectedFieldsEmpty, doesSelectedNearbyFieldsEmpty } = PlayerPlaygroundUtils;
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

	protected highlightVerticalyCorrectShipFields(firstIndex: number, lastIndex: number, currentColumn: number): void {
		for (let i = firstIndex; i < lastIndex; i++) {
			const className = this.getPlaygroundFieldClassName(i, currentColumn);
			this.playground[i][currentColumn] = 1;
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

	protected highlightVerticalyIncorrectShipFields(firstIndex: number, lastIndex: number, currentColumn: number): void {
		GameOptions.currentlySelectedField = null;

		for (let i = firstIndex; i < lastIndex; i++) {
			const className = this.getPlaygroundFieldClassName(i, currentColumn);
			const element: HTMLElement | null = document.querySelector(className);

			if (element) {
				this.tempHighlightedFields.push(`${i}_${currentColumn}`);
				element.classList.add("field-with-error-gradient");
			}
		}
	}

	protected clearShipFields(): void {
		this.clearPlaygroundFields();

		GameOptions.currentSelectedShip?.shipOnPlayground.forEach((className: string) => {
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
