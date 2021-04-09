import { EventType } from "../consts/EventType";
import { SetType } from "../consts/SetType";
import { GameOptions } from "../GameOptions";
import { Ship } from "../Ship";
import { PlaygroundUtils } from "./PlaygroundUtils";
import { Playground } from "./Playground";

export class PlayerPlayground extends Playground {
	public playgroundShips: Ship[] = [];
	protected currentlySelectedField: string = "";
	protected playgroundClassPrefix: string = "player-playground";

	constructor() {
		super();

		this.preparePlayerShips();
		this.preparePlaygroundDOMStructure();
		this.addEventsOnPlayerPlayground();
	}

	public randomizeShipsPosition = () => {
		this.clearPlayground();
		this.randomizeShipsPositions();
		this.hideShips();
	};

	public getShipsDOMElements(): HTMLElement[] {
		return this.playgroundShips.map((ship) => ship.shipElement);
	}

	public removeEventsFromPlayerPlayground() {
		super.removeEventsFromPlayerPlayground();

		if (PlaygroundUtils.isMobile()) {
			this.playgroundDOM.removeEventListener("touchmove", this.fieldTouchMove, false);
		}

		if (!PlaygroundUtils.isMobile()) {
			this.playgroundDOM.removeEventListener("mouseover", this.playgroundMouseOver);
			this.playgroundDOM.removeEventListener("mouseleave", this.playgroundMouseLeave);
		}

		this.playgroundDOM.removeEventListener("click", this.clickOnPlayground);
		document.body.removeEventListener(EventType.ROTATE_SHIP, this.onShipRotate);
	}

	protected addListenerOnPlaygroundField = (div: HTMLElement) => {
		if (PlaygroundUtils.isMobile()) {
			div.addEventListener("click", this.fieldClick);
		} else {
			div.addEventListener("mouseenter", this.fieldMouseOver);
		}
	};

	protected hideShips() {
		this.playgroundShips.forEach((ship) => ship.hideShip());
	}

	protected onShipRotate = () => {
		this.highlightFields(this.currentlySelectedField);
	};

	protected clickOnPlayground = (e: Event) => {
		e.stopPropagation();
	};

	protected addEventsOnPlayerPlayground() {
		this.playgroundDOM.addEventListener("click", this.clickOnPlayground);

		if (PlaygroundUtils.isMobile()) {
			this.playgroundDOM.addEventListener("touchmove", this.fieldTouchMove, false);
		}

		if (!PlaygroundUtils.isMobile()) {
			this.playgroundDOM.addEventListener("mouseover", this.playgroundMouseOver);
			this.playgroundDOM.addEventListener("mouseleave", this.playgroundMouseLeave);
		}

		document.body.addEventListener(EventType.ROTATE_SHIP, this.onShipRotate);
	}

	protected playgroundMouseOver = () => {
		if (GameOptions.currentSelectedShip) {
			GameOptions.currentSelectedShip.hideShip();
		}
	};

	protected playgroundMouseLeave = () => {
		if (GameOptions.currentSelectedShip) {
			GameOptions.currentSelectedShip.showShip();
			GameOptions.currentlySelectedField = null;
			this.clearShipFields();
		}
	};

	protected playgroundTouchEnd = () => {
		if (GameOptions.currentSelectedShip) {
			GameOptions.currentSelectedShip.showShip();
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
		const { getRowAndColumnNumberFromClassName } = PlaygroundUtils;

		const fieldClassName: string = (e.target as HTMLElement).classList[1];
		const { row, column } = getRowAndColumnNumberFromClassName(fieldClassName);

		GameOptions.currentlySelectedField = { row, column };

		if (GameOptions.currentSelectedShip) {
			GameOptions.currentSelectedShipAfterClick?.shipElement.classList.remove("selected_ship");
			GameOptions.currentSelectedShipAfterClick = null;

			const wasSet = this.setShipOnPlaygroundIfPossible(
				row,
				column,
				GameOptions.currentSelectedShip,
				GameOptions.currentSelectedShip.direction,
				SetType.RANDOM,
			);

			if (GameOptions.currentSelectedShip) {
				if (wasSet) GameOptions.currentSelectedShip.hideShip();
				else GameOptions.currentSelectedShip.showShip();
			}
			this.clearShipFields();
			GameOptions.currentSelectedShip = null;
		}
	};

	protected fieldTouchMove = (e: TouchEvent): void => {
		this.playgroundDOM.removeEventListener("touchend", this.playgroundTouchEnd, false);
		this.playgroundDOM.addEventListener("touchend", this.playgroundTouchEnd, false);

		let selectedField;
		const x = e.touches[0].clientX;
		const y = e.touches[0].clientY;
		const fields = this.playgroundDOM.querySelectorAll(".playground-field") as NodeListOf<HTMLElement>;

		fields.forEach((field: HTMLElement) => {
			const rect = field.getBoundingClientRect();
			if (x >= rect.left && x <= rect.right && y <= rect.bottom && y >= rect.top) selectedField = field;
		});

		if (selectedField) {
			const fieldClassName: string = (selectedField as HTMLElement).classList[1];
			this.highlightFields(fieldClassName);
		}
	};

	protected highlightFields = (fieldClassName: string): void => {
		this.currentlySelectedField = fieldClassName;
		const shipSize = GameOptions.currentSelectedShip?.size || -1;

		if (shipSize === 0) {
			return;
		}

		const { getRowAndColumnNumberFromClassName } = PlaygroundUtils;
		const shipDirection = GameOptions.currentSelectedShip?.direction;
		const rowAndColumnIndex = getRowAndColumnNumberFromClassName(fieldClassName);
		const { row, column } = rowAndColumnIndex;

		GameOptions.currentlySelectedField = rowAndColumnIndex;

		this.clearShipFields();

		this.setShipOnPlaygroundIfPossible(row, column, GameOptions.currentSelectedShip, shipDirection, SetType.MANUALLY);
	};

	protected clearShipFields(): void {
		this.clearPlaygroundFields();

		GameOptions.currentSelectedShip?.shipOnPlayground.forEach((className: string) => {
			const element: HTMLElement = document.querySelector(className);
			if (element) {
				element.classList.remove("field-with-gradient");
			}
		});

		this.tempHighlightedFields.forEach((className) => {
			const element: HTMLElement = document.querySelector(`.${this.playgroundClassPrefix}-${className}`);
			if (element) {
				element.classList.remove("field-with-error-gradient");
			}
		});

		this.tempHighlightedFields.length = 0;
		GameOptions.currentSelectedShip?.clearFields();
	}

	protected clearPlaygroundFields(): void {
		GameOptions.currentSelectedShip?.shipOnPlayground.forEach((className: string) => {
			const { row, column } = PlaygroundUtils.getRowAndColumnNumberFromClassName(className);
			this.playground[row][column] = 0;
		});
	}

	private preparePlayerShips() {
		GameOptions.availableShips.forEach((shipSize) => {
			const ship = new Ship(shipSize);
			this.playgroundShips.push(ship);
		});
	}
}
