import { GameScreen } from "../../interfaces/GameScreen";
import { GameOptions } from "../GameOptions";
import { PlayerPlayground } from "../playground/PlayerPlayground";
import { PlayerPlaygroundUtils } from "../playground/PlayerPlaygroundUtils";

export class PlaygroundScreen extends GameScreen {
	public prepareScreen(): void {
		GameOptions.playerPlayground = new PlayerPlayground();

		const section = document.createElement("section");
		section.setAttribute("id", "playgroundScreen");

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

		if (PlayerPlaygroundUtils.isMobile()) {
			const buttonRotate = document.createElement("button");
			buttonRotate.setAttribute("class", "btn-rotate");
			buttonRotate.innerText = "Rotate ship!";
			section.appendChild(buttonRotate);
		}

		GameOptions.changeScreenContent(section);
	}

	public prepareScreenEvents(): void {
		const playButton = document.querySelector(".btn-play");
		playButton?.addEventListener("click", this.startGame);

		const buttonRandomize = document.querySelector(".btn-randomize");
		buttonRandomize?.addEventListener("click", GameOptions.playerPlayground.randomizeShipsPosition);

		if (PlayerPlaygroundUtils.isMobile()) {
			const buttonRotate = document.querySelector(".btn-rotate");
			buttonRotate?.addEventListener("click", GameOptions.playerPlayground.rotateShip);
		}
	}

	public startGame = (): void => {
		if (GameOptions.playerPlayground.arePlaygroundReady()) {
			GameOptions.changeScreen(this.nextScreen);
		}
	};

	public unregisterScreenEvents(): void {
		GameOptions.playerPlayground.removeEventsFromPlayerPlayground();

		const playButton = document.querySelector(".btn-play");
		playButton?.removeEventListener("click", this.startGame);

		const buttonRandomize = document.querySelector(".btn-randomize");
		buttonRandomize?.removeEventListener("click", GameOptions.playerPlayground.randomizeShipsPosition);

		if (PlayerPlaygroundUtils.isMobile()) {
			const buttonRotate = document.querySelector(".btn-rotate");
			buttonRotate?.removeEventListener("click", GameOptions.playerPlayground.rotateShip);
		}
	}
}
