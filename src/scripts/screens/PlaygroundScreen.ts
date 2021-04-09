import { GameScreen } from "../types/GameScreen";
import { EventType } from "../consts/EventType";
import { GameOptions } from "../GameOptions";
import { PlayerPlayground } from "../playground/PlayerPlayground";
import { PlaygroundUtils } from "../playground/PlaygroundUtils";
import { Ship } from "../Ship";

export class PlaygroundScreen extends GameScreen {
	protected shipsOnPlaygroundCount = 0;

	public prepareScreen(): void {
		GameOptions.playerPlayground = new PlayerPlayground();

		const section = document.createElement("section");
		section.setAttribute("id", "playgroundScreen");

		const playgroundSection = document.createElement("section");
		playgroundSection.classList.add("playground-section");

		const playerShips = GameOptions.playerPlayground.getShipsDOMElements();
		const shipsSections = document.createElement("div");
		shipsSections.classList.add("playground-ships");
		shipsSections.style.width = `${GameOptions.playgroundSize}px`;

		playerShips.forEach((ship: HTMLElement) => {
			shipsSections.appendChild(ship);
		});

		const buttonPlay = document.createElement("button");
		buttonPlay.setAttribute("class", "btn-play");
		buttonPlay.innerText = "Start a game!";

		const buttonRandomize = document.createElement("button");
		buttonRandomize.setAttribute("class", "btn-randomize");
		buttonRandomize.innerText = "Randomize ships position!";

		playgroundSection.appendChild(shipsSections);
		playgroundSection.appendChild(GameOptions.playerPlayground.playgroundDOM);
		section.appendChild(playgroundSection);

		section.appendChild(buttonPlay);
		section.appendChild(buttonRandomize);

		if (PlaygroundUtils.isMobile()) {
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
		buttonRandomize?.addEventListener("click", this.randomizeShips);

		if (PlaygroundUtils.isMobile()) {
			const buttonRotate = document.querySelector(".btn-rotate");
			buttonRotate?.addEventListener("click", Ship.rotateCurrentlySelectedShip);
		}

		document.body.addEventListener(EventType.SHIP_WAS_SET, this.shipsWasSet);
	}

	public startGame = (): void => {
		if (this.shipsOnPlaygroundCount === GameOptions.availableShips.length) {
			GameOptions.changeScreen(this.nextScreen);
		}
	};

	public unregisterScreenEvents(): void {
		GameOptions.playerPlayground.removeEventsFromPlayerPlayground();

		document.body.removeEventListener(EventType.SHIP_WAS_SET, this.shipsWasSet);

		const playButton = document.querySelector(".btn-play");
		playButton?.removeEventListener("click", this.startGame);

		const buttonRandomize = document.querySelector(".btn-randomize");
		buttonRandomize?.removeEventListener("click", this.randomizeShips);

		if (PlaygroundUtils.isMobile()) {
			const buttonRotate = document.querySelector(".btn-rotate");
			buttonRotate?.removeEventListener("click", Ship.rotateCurrentlySelectedShip);
		}
	}

	protected randomizeShips = () => {
		this.shipsOnPlaygroundCount = 0;
		GameOptions.playerPlayground.randomizeShipsPosition();
	};

	protected shipsWasSet = () => {
		this.shipsOnPlaygroundCount++;

		if (this.shipsOnPlaygroundCount === GameOptions.availableShips.length) {
			const playButton: HTMLElement = document.querySelector(".btn-play");
			if (playButton) playButton.style.display = "block";

			const shipsSections: HTMLElement = document.querySelector(".playground-ships");
			shipsSections?.classList.add("all-ships-set");
		}
	};
}
