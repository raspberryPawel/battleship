import { GameOptions } from "./GameOptions";
import { ShipDirection } from "./types/ShipDirection";

export class Ship {
	private shipSize: number;
	private _direction: ShipDirection = ShipDirection.horizontal;

	private fieldsOnPlayground: string[] = [];
	public readonly shipElement: HTMLElement = document.createElement("div");
	protected addShipToPlayground: () => void = () => {};

	constructor(shipSize: number, addShipToPlayground: () => void = () => {}) {
		this.shipSize = shipSize;
		this.createShipDOMElement();
		this.addShipToPlayground = addShipToPlayground;
	}

	public get size(): number {
		return this.shipSize;
	}

	public get direction(): ShipDirection {
		return this._direction;
	}

	public get shipOnPlayground(): string[] {
		return this.fieldsOnPlayground;
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

		this.shipElement.addEventListener("mousedown", (e) => {
			GameOptions.currentSelectedShip = this;

			document.body.addEventListener("mousemove", this.moveShip);
			document.body.addEventListener("mouseup", this.dropShip);
			document.body.addEventListener("keydown", this.pressKey);
		});

		this.shipElement.addEventListener("click", (e) => {
			e.stopPropagation();
			document.body.addEventListener("click", this.unselectShip);
			document.body.addEventListener("keydown", this.pressKey);

			GameOptions.currentSelectedShipAfterClick?.shipElement.classList.remove("selected_ship");
			GameOptions.currentSelectedShip = this;
			GameOptions.currentSelectedShipAfterClick = this;

			this.shipElement.classList.add("selected_ship");
		});
	}

	public unselectShip = () => {
		GameOptions.currentSelectedShipAfterClick?.shipElement.classList.remove("selected_ship");
		GameOptions.currentSelectedShip = null;
		GameOptions.currentSelectedShipAfterClick = null;

		document.body.removeEventListener("click", this.unselectShip);
	};

	private moveShip = (e: MouseEvent): void => {
		if (this.shipElement) {
			this.changeShipPosition(e.clientX, e.clientY);
		}
	};

	private pressKey = (e: KeyboardEvent): void => {
		console.log(e);
		if (e.key === "r") {
			this.shipElement.style.flexDirection = "column";
			this._direction = this._direction === ShipDirection.vertical ? ShipDirection.horizontal : ShipDirection.vertical;
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

	public dropShip = (): void => {
		if (this.shipElement) {
			this.shipElement.classList.remove("selected_ship");
			this.shipElement.style.position = "static";

			document.body.removeEventListener("mousemove", this.moveShip);
			document.body.removeEventListener("mouseup", this.dropShip);
			document.body.removeEventListener("keydown", this.pressKey);

			if (GameOptions.currentlySelectedField && this.shipOnPlayground.length > 0) {
				this.hideShip();
				this.addShipToPlayground();
			}

			this.shipElement.style.opacity = "1";

			GameOptions.currentlySelectedField = null;
			GameOptions.currentSelectedShip = null;
		}
	};

	public hideShip() {
		this.shipElement.style.display = "none";
	}
}
