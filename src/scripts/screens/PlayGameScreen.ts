import { GameScreen } from "../../interfaces/GameScreen";
import { Game } from "../Game";
import { PlayerMoveStrategy } from "../moveStrategies/PlayerMoveStrategy";
import { GameOptions } from "../GameOptions";
import { ComputerPlayground } from "../playground/ComputerPlayground";
import { SimpleComputerMoveStrategy } from "../moveStrategies/SimpleComputerMoveStrategy";

export class PlayGameScreen extends GameScreen {
	public prepareScreen(): void {
		const section = document.createElement("section");
		section.setAttribute("id", "playGameScreen");

		GameOptions.computerPlayground = new ComputerPlayground();
		GameOptions.playerPlayground.changePlaygroundSize(GameOptions.playgroundSize / 2);

		section.appendChild(GameOptions.computerPlayground.playgroundDOM);
		section.appendChild(GameOptions.playerPlayground.playgroundDOM);

		const game: Game = new Game(
			GameOptions.playerPlayground.playground,
			GameOptions.computerPlayground.playground,
			new PlayerMoveStrategy(),
			new SimpleComputerMoveStrategy()
		);

		GameOptions.changeScreenContent(section);
		game.startGame();
	}

	public prepareScreenEvents(): void {
		// const playButton = document.querySelector(".btn-play");
		// playButton?.addEventListener("click", this.startGame);
	}

	public startGame(): void {
		// Game.changeScreen(this.nextScreen);
	}

	public unregisterScreenEvents(): void {
		// const playButton = document.querySelector(".btn-play");
		// playButton?.removeEventListener("click", this.startGame);
	}
}
