import { GameScreen } from "../interfaces/GameScreen";
import { Game } from "./Game";
import { Playground } from "./Playground";

export class PlaygroundScreen extends GameScreen {
  public prepareScreen(): void {
    const main = Game.getMainDOMElement();
    main.innerHTML = "";

    const section = document.createElement("section");
    section.setAttribute("id", "playgroundScreen");

    const play = new Playground();
    const playground = play.preparePlaygroundDOMStructure();
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
