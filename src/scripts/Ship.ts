import { EventType } from "./consts/EventType";
import { ShipDirection } from "./consts/ShipDirection";
import { EventDispatcher } from "./EventDispatcher";
import { GameOptions } from "./GameOptions";
import { PlaygroundUtils } from "./playground/PlaygroundUtils";

export class Ship {
	public readonly shipElement: HTMLElement = document.createElement("div");
	private readonly shipSize: number;

	private wasShipSet: boolean = false;
	private shipDirection: ShipDirection = ShipDirection.horizontal;
	private fieldsOnPlayground: string[] = [];

	constructor(shipSize: number) {
		this.shipSize = shipSize;
		this.createShipDOMElement();
	}

	public get size(): number {
		return this.shipSize;
	}

	public get direction(): ShipDirection {
		return this.shipDirection;
	}

	public set direction(shipDirection: ShipDirection) {
		this.shipDirection = shipDirection;
	}

	public get shipOnPlayground(): string[] {
		return this.fieldsOnPlayground;
	}

	public static rotateCurrentlySelectedShip(e: Event) {
		e.stopPropagation();

		if (GameOptions.currentSelectedShip) {
			const { direction } = GameOptions.currentSelectedShip;
			GameOptions.currentSelectedShip.direction =
				direction === ShipDirection.vertical
					? ShipDirection.horizontal
					: ShipDirection.vertical;

			EventDispatcher.dispatch(EventType.ROTATE_SHIP);
		}
	}

	public addField(field: string) {
		this.fieldsOnPlayground.push(field);
	}

	public clearFields() {
		this.fieldsOnPlayground.length = 0;
	}

	public createShipDOMElement(): void {
		this.shipElement.className = "ship_container";
		this.shipElement.style.width = `${GameOptions.fieldSize * this.shipSize + this.shipSize * 2}px`;
		this.shipElement.style.height = `${GameOptions.fieldSize}px`;

		for (let i = 0; i < this.shipSize; i++) {
			const div: HTMLElement = document.createElement("div");
			div.className = "ship_field";
			div.style.width = `${GameOptions.fieldSize}px`;
			div.style.height = `${GameOptions.fieldSize}px`;

			this.shipElement.appendChild(div);
		}

		this.shipElement.addEventListener("mousedown", () => {
			GameOptions.currentSelectedShip = this;

			document.body.addEventListener("mousemove", this.moveShip);
			document.body.addEventListener("mouseup", this.dropShip);
			document.body.addEventListener("keydown", this.pressKey);
		});

		if (PlaygroundUtils.isMobile()) {
			this.shipElement.addEventListener("click", this.clickOnShip);
		}
	}

	public unselectShip = () => {
		if (GameOptions.currentSelectedShipAfterClick) {
			GameOptions.currentSelectedShipAfterClick.shipElement.style.opacity = "1";
			GameOptions.currentSelectedShipAfterClick.shipElement.classList.remove("selected_ship");
		}

		GameOptions.currentSelectedShip = null;
		GameOptions.currentSelectedShipAfterClick = null;

		document.body.removeEventListener("click", this.unselectShip);
	};

	public dropShip = (): void => {
		if (this.shipElement) {
			this.shipElement.classList.remove("selected_ship");
			this.shipElement.style.position = "static";

			document.body.removeEventListener("mousemove", this.moveShip);
			document.body.removeEventListener("mouseup", this.dropShip);
			document.body.removeEventListener("keydown", this.pressKey);

			if (GameOptions.currentlySelectedField && this.shipOnPlayground.length > 0) {
				this.wasShipSet = true;
				this.hideShip();
				EventDispatcher.dispatch(EventType.SHIP_WAS_SET);
			} else this.showShip();

			GameOptions.currentlySelectedField = null;
			GameOptions.currentSelectedShip = null;
		}
	};

	public hideShip() {
		this.shipElement.style.display = "none";
	}

	public showShip() {
		if (!this.wasShipSet) {
			this.shipElement.style.display = "flex";
			this.shipElement.style.opacity = "1";
			this.shipElement.style.zIndex = "1";
		}

	}

	protected clickOnShip = (e: Event) => {
		e.stopPropagation();
		document.body.addEventListener("click", this.unselectShip);

		GameOptions.currentSelectedShipAfterClick?.shipElement.classList.remove("selected_ship");
		GameOptions.currentSelectedShip = this;
		GameOptions.currentSelectedShipAfterClick = this;

		this.shipElement.classList.add("selected_ship");
	};

	private moveShip = (e: MouseEvent): void => {
		if (this.shipElement) {
			this.changeShipPosition(e.clientX, e.clientY);
		}
	};

	private pressKey = (e: KeyboardEvent): void => {
		if (e.key === "r") {
			this.shipDirection =
				this.shipDirection === ShipDirection.vertical ? ShipDirection.horizontal : ShipDirection.vertical;
			EventDispatcher.dispatch(EventType.ROTATE_SHIP);
		}
	};

	private changeShipPosition = (x: number, y: number): void => {
		if (this.shipElement) {
			const slideX = 20;
			const slideY = 20;

			this.shipElement.style.position = "absolute";
			this.shipElement.style.zIndex = "-1";
			this.shipElement.style.left = x - slideX + "px";
			this.shipElement.style.top = y - slideY + "px";
		}
	};
}
