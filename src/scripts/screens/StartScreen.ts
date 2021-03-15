import { GameScreen, ScreenType } from "../../interfaces/GameScreen";
import { GameOptions } from "../GameOptions";

export class StartScreen extends GameScreen {
	public prepareScreen(): void {
		const section = document.createElement("section");
		section.setAttribute("id", "startScreen");

		const logoContainer = document.createElement("div");
		logoContainer.setAttribute("class", "logoContainer");

		const strong = document.createElement("strong");
		strong.innerText = "Battleships";

		const logo = document.createElement("div");
		logo.setAttribute("class", "logo");

		const buttonPlay = document.createElement("button");
		buttonPlay.setAttribute("class", "btn-play");
		buttonPlay.innerText = "Start a game!";

		logoContainer.appendChild(strong);
		logoContainer.appendChild(logo);

		section.appendChild(logoContainer);
		section.appendChild(buttonPlay);

		const main = GameOptions.getMainDOMElement();
		main.append(section);
	}

	public prepareScreenEvents(): void {
		const playButton = document.querySelector(".btn-play");
		playButton?.addEventListener("click", this.startGame);
		console.log(playButton);
	}

	public startGame = (): void => {
		// console.log("start game => ", this.nextScreen);

		GameOptions.changeScreen(this.nextScreen);
	};

	public unregisterScreenEvents(): void {
		const playButton = document.querySelector(".btn-play");
		playButton?.removeEventListener("click", this.startGame);
	}
}
