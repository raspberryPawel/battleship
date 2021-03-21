import { GameOptions } from "./GameOptions";

export class Ship {
	private shipSize: number;
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
		});

		this.shipElement.addEventListener("click", (e) => {
			GameOptions.currentSelectedShip = this;
			this.shipElement.style.border = "1px solid red";
		});
	}

	private moveShip = (e: MouseEvent): void => {
		if (this.shipElement) {
			this.changeShipPosition(e.clientX, e.clientY);
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
			this.shipElement.style.border = "none";
			this.shipElement.style.position = "static";

			document.body.removeEventListener("mousemove", this.moveShip);
			document.body.removeEventListener("mouseup", this.dropShip);

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