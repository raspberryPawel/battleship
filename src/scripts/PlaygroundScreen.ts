import { GameScreen } from "../interfaces/GameScreen";
import { Game } from "./Game";
import { PlayerPlayground } from "./PlayerPlayground";

export class PlaygroundScreen extends GameScreen {
  public prepareScreen(): void {
    const main = Game.getMainDOMElement();
    main.innerHTML = "";

    const section = document.createElement("section");
    section.setAttribute("id", "playgroundScreen");

    const playerPlayground = new PlayerPlayground();
    const playground = playerPlayground.preparePlaygroundDOMStructure();
    const playerShips = playerPlayground.getShipsDOMElements();
    // const playground = playerPlayground.preparePlaygroundDOMStructure();

    playerShips.forEach((ship) => {
      section.appendChild(ship);
    });

    section.appendChild(playground);
    main.appendChild(section);
  }

  public prepareScreenEvents() {
    console.log("prepare playground");
  }

  public unregisterScreenEvents(): void {
    console.log("unregister  playground events");
  }
}
