import { GameScreen } from "../../interfaces/GameScreen";
import { Game } from "../classes/Game";
import { PlayerMoveStrategy } from "../moveStrategies/PlayerMoveStrategy";
import { GameOptions } from "../GameOptions";
import { ComputerPlayground } from "../playground/ComputerPlayground";
import { PlayerPlayground } from "../playground/PlayerPlayground";
import { SimpleComputerMoveStrategy } from "../moveStrategies/SimpleComputerMoveStrategy";

export class PlayGameScreen extends GameScreen {
	public prepareScreen(): void {
		const main = GameOptions.getMainDOMElement();
		main.innerHTML = "";

		const section = document.createElement("section");
		section.setAttribute("id", "playGameScreen");

		GameOptions.computerPlayground = new ComputerPlayground();
		GameOptions.playerPlayground.rebuildPlaygroundDOMStructure((GameOptions.playgroundSize * 2) / 3);

		section.appendChild(GameOptions.computerPlayground.playgroundDOM);
		section.appendChild(GameOptions.playerPlayground.playgroundDOM);

		main.appendChild(section);

		const game: Game = new Game(
			GameOptions.playerPlayground.playground,
			GameOptions.computerPlayground.playground,
			new PlayerMoveStrategy(),
			new SimpleComputerMoveStrategy()
		);
		
		game.startGame();
	}

	public prepareScreenEvents(): void {
		// const playButton = document.querySelector(".btn-play");
		// playButton?.addEventListener("click", this.startGame);
		// console.log(playButton);
	}

	public startGame(): void {
		// console.log("SIEMANOER");
		// Game.changeScreen(this.nextScreen);
	}

	public unregisterScreenEvents(): void {
		// const playButton = document.querySelector(".btn-play");
		// playButton?.removeEventListener("click", this.startGame);
	}
}
