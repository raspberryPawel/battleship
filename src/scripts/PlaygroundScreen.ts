import { GameScreen } from "../interfaces/GameScreen";
import { Game } from "./Game";
import { PlayerPlayground } from "./playground/PlayerPlayground";

export class PlaygroundScreen extends GameScreen {
	public playground: PlayerPlayground = new PlayerPlayground();

	public prepareScreen(): void {
		const main = Game.getMainDOMElement();
		main.innerHTML = "";

		const section = document.createElement("section");
		section.setAttribute("id", "playgroundScreen");

		const playerShips = this.playground.getShipsDOMElements();

		const shipsSections = document.createElement("div");

		playerShips.forEach((ship: HTMLElement) => {
			shipsSections.appendChild(ship);
		});

		section.appendChild(shipsSections);
		section.appendChild(this.playground.playgroundDOM);

		main.appendChild(section);
	}

	public prepareScreenEvents() {
		console.log("prepare playground");
	}

	public unregisterScreenEvents(): void {
		this.playground.removeEventsFromPlayerPlayground();
		console.log("unregister  playground events");
	}
}
