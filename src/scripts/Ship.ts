import { Game } from "./Game";

export class Ship {
  private shipSize: number;
  private fieldsOnPlayground: string[] = [];
  public readonly shipElement: HTMLElement = document.createElement("div");

  constructor(shipSize: number) {
    this.shipSize = shipSize;
    this.createShipDOMElement();

    console.log("shipElement => ", this.shipElement);
  }

  get size(): number {
    return this.shipSize;
  }

  get shipOnPlayground(): string[] {
    return this.fieldsOnPlayground;
  }

  public addField(field: string) {
    this.fieldsOnPlayground.push(field);
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
      document.body.addEventListener("mousemove", this.moveShip);
      document.body.addEventListener("mouseup", this.dropShip);
    });
  }

  private moveShip = (e: MouseEvent): void => {
    if (this.shipElement) {
      const slideX = 20;
      const slideY = 20;

      this.shipElement.style.position = "absolute";
      this.shipElement.style.left = e.clientX - slideX + "px";
      this.shipElement.style.top = e.clientY - slideY + "px";
    }
  };

  private dropShip = (e: MouseEvent): void => {
    if (this.shipElement) {
      this.shipElement.style.position = "static";

      document.body.removeEventListener("mousemove", this.moveShip);
      document.body.removeEventListener("mouseup", this.dropShip);
    }
  };
}
