import { Game } from "./Game";
import { Playground } from "./Playground";
import { Ship } from "./Ship";

export class PlayerPlayground extends Playground {
  public playgroundShips: Ship[] = [];

  constructor() {
    super();
    this.preparePlayerShips();
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
}
