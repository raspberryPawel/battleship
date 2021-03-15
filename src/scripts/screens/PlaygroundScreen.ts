import { GameScreen } from "../../interfaces/GameScreen";
import { GameOptions } from "../GameOptions";
import { ComputerPlayground } from "../playground/ComputerPlayground";
import { PlayerPlayground } from "../playground/PlayerPlayground";

export class PlaygroundScreen extends GameScreen {
	public prepareScreen(): void {
		const main = GameOptions.getMainDOMElement();
		main.innerHTML = "";
		// const a = new ComputerPlayground();
		const section = document.createElement("section");
		section.setAttribute("id", "playgroundScreen");

		GameOptions.playerPlayground = new PlayerPlayground();
		const playerShips = GameOptions.playerPlayground.getShipsDOMElements();

		const shipsSections = document.createElement("div");

		playerShips.forEach((ship: HTMLElement) => {
			shipsSections.appendChild(ship);
		});

		const buttonPlay = document.createElement("button");
		buttonPlay.setAttribute("class", "btn-play");
		buttonPlay.innerText = "Start a game!";

		section.appendChild(shipsSections);
		section.appendChild(GameOptions.playerPlayground.playgroundDOM);
		section.appendChild(buttonPlay);

		main.appendChild(section);
	}

	public prepareScreenEvents(): void {
		const playButton = document.querySelector(".btn-play");
		playButton?.addEventListener("click", this.startGame);
		console.log(playButton);
	}

	public startGame = (): void => {
		console.log("SIEMANOER => ", this.nextScreen);
		GameOptions.changeScreen(this.nextScreen);
	};

	public unregisterScreenEvents(): void {
		GameOptions.playerPlayground.removeEventsFromPlayerPlayground();
		const playButton = document.querySelector(".btn-play");
		playButton?.removeEventListener("click", this.startGame);

		console.log("unregister  playground events");
	}
}
