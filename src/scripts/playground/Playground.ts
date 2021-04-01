import { EventType } from "../consts/EventType";
import { FieldClassNames } from "../consts/FieldClassNames";
import { SetType } from "../consts/SetType";
import { ShipDirection } from "../consts/ShipDirection";
import { GameOptions } from "../GameOptions";
import { Ship } from "../Ship";
import { DoesSelectedFieldsEmptyData } from "../types/DoesSelectedFieldsEmptyData";
import { PlaygroundType } from "../types/PlaygroundType";
import { PlayerPlaygroundUtils } from "./PlayerPlaygroundUtils";

export abstract class Playground {
	public playgroundDOM: HTMLElement = document.createElement("div");
	public playground: PlaygroundType = [];
	protected tempHighlightedFields: string[] = [];
	public playgroundShips: Ship[] = [];

	protected playgroundSizeInPx: number;
	protected fieldSizeInPx: number;
	protected showShipsOnPlayground: boolean = true;
	protected shipsOnPlaygroundCount: number = 0;
	protected abstract playgroundClassPrefix: string = "";

	protected constructor(playgroundSize?: number) {
		this.playgroundSizeInPx = playgroundSize ? playgroundSize : GameOptions.playgroundSize;
		this.fieldSizeInPx = playgroundSize
			? playgroundSize / GameOptions.playgroundFieldsCount - 4
			: GameOptions.fieldSize;

		this.preparePlayground();

		document.body.addEventListener(EventType.SHIP_WAS_SET, this.shipsWasSet);
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

	public removeEventsFromPlayerPlayground() {
		document.body.removeEventListener(EventType.SHIP_WAS_SET, this.shipsWasSet);
	}

	protected shipsWasSet = () => {
		this.shipsOnPlaygroundCount++;
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

		while (this.shipsOnPlaygroundCount < this.playgroundShips.length) {
			const ship = this.playgroundShips[this.shipsOnPlaygroundCount];
			const row = Math.floor(Math.random() * 10);
			const column = Math.floor(Math.random() * 10);
			const shipDirections = [ShipDirection.horizontal, ShipDirection.vertical];
			const randomIndex = Math.floor(Math.random() * shipDirections.length - 1) + 1;
			const shipDirection = shipDirections[randomIndex];

			this.setShipOnPlaygroundIfPossible(row, column, ship, shipDirection, SetType.RANDOM);
		}
	};

	protected setShipOnPlaygroundIfPossible(row: number, column: number, ship: Ship, shipDirection: ShipDirection,
		setType: SetType) {
		if (!ship) return false;

		if (setType === SetType.RANDOM)
			GameOptions.currentlySelectedField = { row, column };

		const shipSize = ship.size;
		const doesShipOnPlaygroundEnd = shipDirection === ShipDirection.horizontal
			? shipSize + column < GameOptions.playgroundFieldsCount
			: shipSize + row < GameOptions.playgroundFieldsCount;

		const data: DoesSelectedFieldsEmptyData = doesShipOnPlaygroundEnd
			? {
				playground: this.playground,
				currentChecked: shipDirection === ShipDirection.horizontal ? row : column,
				first: shipDirection === ShipDirection.horizontal ? column : row,
				last: shipDirection === ShipDirection.horizontal ? shipSize + column : shipSize + row,
				shipDirection,
			}
			: {
				playground: this.playground,
				currentChecked: shipDirection === ShipDirection.horizontal ? row : column,
				first: GameOptions.playgroundFieldsCount - shipSize,
				last: GameOptions.playgroundFieldsCount,
				shipDirection,
			};

		const { first, last, currentChecked } = data;
		const doesFieldsAvailable = PlayerPlaygroundUtils.doesFieldsAvailable(data);

		if (setType === SetType.RANDOM && doesFieldsAvailable)
			this.setShipOnPlayground(first, last, currentChecked, ship, shipDirection);

		if (setType === SetType.MANUALLY) {
			doesFieldsAvailable
				? this.highlightShipOnPlayground(first, last, currentChecked, shipDirection, FieldClassNames.hit)
				: this.highlightShipOnPlayground(first, last, currentChecked, shipDirection, FieldClassNames.misplaced);
		}

		return doesFieldsAvailable ? true : false;
	}

	protected highlightShipOnPlayground(firstIndex: number, lastIndex: number, currentRowOrColumn: number,
		direction: ShipDirection, fieldClassName: FieldClassNames): void {

		const getDOMField = (row: number, column: number): HTMLElement => {
			const elementClass = this.getPlaygroundFieldClassName(row, column);
			const element: HTMLElement = document.querySelector(elementClass);

			return element ? element : null;
		};

		const highlightShip = (row: number, column: number) => {
			const element = getDOMField(row, column);
			if (element) {
				element.classList.add(fieldClassName);

				if (fieldClassName === FieldClassNames.misplaced) {
					GameOptions.currentlySelectedField = null;
					this.tempHighlightedFields.push(`${row}_${column}`);
				} else {
					this.playground[row][column] = 1;
					const className = this.getPlaygroundFieldClassName(row, column);
					GameOptions.currentSelectedShip?.addField(className);
				}
			}
		};

		for (let i = firstIndex; i < lastIndex; i++) {
			const row = direction === ShipDirection.horizontal ? currentRowOrColumn : i;
			const column = direction === ShipDirection.horizontal ? i : currentRowOrColumn;

			highlightShip(row, column);
		}
	}

	protected setShipOnPlayground(firstIndex: number, lastIndex: number, currentRowOrColumn: number, ship: Ship,
		direction: ShipDirection): void {
		for (let i = firstIndex; i < lastIndex; i++) {

			direction === ShipDirection.horizontal
				? this.setAndHighlightShip(currentRowOrColumn, i, ship)
				: this.setAndHighlightShip(i, currentRowOrColumn, ship);
		}
	}

	protected setAndHighlightShip(row: number, column: number, ship: Ship) {
		this.playground[row][column] = 1;
		ship.addField(`${row}_${column}`);

		if (this.showShipsOnPlayground) {
			const field: HTMLElement = this.playgroundDOM.querySelector(this.getPlaygroundFieldClassName(row, column));

			if (field) field.classList.add(FieldClassNames.hit);
		}

		ship.dropShip();
	}

	protected clearPlayground() {
		this.playground.forEach((row, rowIndex) => {
			row.forEach((field, fieldIndex) => {
				field = 0;
				this.playground[rowIndex][fieldIndex] = 0;
				const div: HTMLElement = this.playgroundDOM.querySelector(
					this.getPlaygroundFieldClassName(rowIndex, fieldIndex),
				);
				if (div) {
					div.classList.remove(FieldClassNames.hit);
					div.classList.remove(FieldClassNames.misplaced);
				}
			});
		});

		this.playgroundShips.forEach((ship) => {
			ship.clearFields();
		});

		this.shipsOnPlaygroundCount = 0;
	}
}
