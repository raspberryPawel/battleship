import { GameScreen } from "../../interfaces/GameScreen";
import { Game } from "../classes/Game";
import { GameOptions } from "../GameOptions";
import { ComputerPlayground } from "../playground/ComputerPlayground";
import { PlayerPlayground } from "../playground/PlayerPlayground";

export class PlaygroundScreen extends GameScreen {
	public prepareScreen(): void {
		const main = GameOptions.getMainDOMElement();
		main.innerHTML = "";

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

		const buttonRandomize = document.createElement("button");
		buttonRandomize.setAttribute("class", "btn-randomize");
		buttonRandomize.innerText = "Randomize ships position!";

		section.appendChild(shipsSections);
		section.appendChild(GameOptions.playerPlayground.playgroundDOM);
		section.appendChild(buttonPlay);
		section.appendChild(buttonRandomize);

		main.appendChild(section);
	}

	public prepareScreenEvents(): void {
		const playButton = document.querySelector(".btn-play");
		playButton?.addEventListener("click", this.startGame);

		const buttonRandomize = document.querySelector(".btn-randomize");
		buttonRandomize?.addEventListener("click", GameOptions.playerPlayground.randomizeShipsPosition);
		console.log(playButton);
	}

	public startGame = (): void => {
		if (GameOptions.playerPlayground.arePlaygroundReady()) GameOptions.changeScreen(this.nextScreen);
	};

	public unregisterScreenEvents(): void {
		GameOptions.playerPlayground.removeEventsFromPlayerPlayground();
		const playButton = document.querySelector(".btn-play");
		playButton?.removeEventListener("click", this.startGame);

		console.log("unregister  playground events");
	}
}
