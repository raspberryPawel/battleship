import { Game } from "./Game";

export class Ship {
	private shipSize: number;
	private fieldsOnPlayground: string[] = [];
	public readonly shipElement: HTMLElement = document.createElement("div");

	constructor(shipSize: number) {
		this.shipSize = shipSize;
		this.createShipDOMElement();
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
		this.shipElement.style.width = `${Game.fieldSize * this.shipSize + 15}px`;
		this.shipElement.style.height = `${Game.fieldSize}px`;

		for (let i = 0; i < this.shipSize; i++) {
			const div: HTMLElement = document.createElement("div");
			div.className = "ship_field";
			div.style.width = `${Game.fieldSize}px`;
			div.style.height = `${Game.fieldSize}px`;

			this.shipElement.appendChild(div);
		}

		this.shipElement.addEventListener("mousedown", (e) => {
			Game.currentSelectedShip = this;
			document.body.addEventListener("mousemove", this.moveShip);
			document.body.addEventListener("mouseup", this.dropShip);
		});

		this.shipElement.addEventListener("touchstart", (e) => {
			Game.currentSelectedShip = this;
			document.body.addEventListener("touchmove", this.mobileMoveShip);
			document.body.addEventListener("touchend", this.dropShip);
		});
	}

	private moveShip = (e: MouseEvent): void => {
		if (this.shipElement) {
			this.changeShipPosition(e.clientX, e.clientY);
		}
	};

	private mobileMoveShip = (e: TouchEvent): void => {
		if (this.shipElement) {
			const touch = e.touches[0];
			this.changeShipPosition(touch.pageX, touch.pageY);
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

	private dropShip = (e: MouseEvent | TouchEvent): void => {
		if (this.shipElement) {
			this.shipElement.style.position = "static";

			document.body.removeEventListener("mousemove", this.moveShip);
			document.body.removeEventListener("mouseup", this.dropShip);
			document.body.removeEventListener("touchmove", this.mobileMoveShip);
		
			if (Game.currentlySelectedField && this.shipOnPlayground.length > 0) {
				this.shipElement.style.display = "none";
			}

			this.shipElement.style.opacity = "1";
			Game.currentlySelectedField = null;
			Game.currentSelectedShip = null;
		}
	};
}