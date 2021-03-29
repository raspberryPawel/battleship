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

		const computerPlaygroundText = document.createElement("strong");
		computerPlaygroundText.innerText = "Computer playground: ";

		const playerPlaygroundText = document.createElement("strong");
		playerPlaygroundText.innerText = "Player playground: ";

		GameOptions.computerPlayground = new ComputerPlayground();
		GameOptions.playerPlayground.changePlaygroundSize((GameOptions.playgroundSize * 2) / 3);

		const computerSection = document.createElement("section");
		computerSection.classList.add("computer-playground-container");

		const playerSection = document.createElement("section");
		playerSection.classList.add("player-playground-container");

		computerSection.appendChild(computerPlaygroundText);
		computerSection.appendChild(GameOptions.computerPlayground.playgroundDOM);
		playerSection.appendChild(playerPlaygroundText);
		playerSection.appendChild(GameOptions.playerPlayground.playgroundDOM);

		section.appendChild(computerSection);
		section.appendChild(playerSection);

		const game: Game = new Game(
			GameOptions.playerPlayground.playground,
			GameOptions.computerPlayground.playground,
			new PlayerMoveStrategy(),
			new SimpleComputerMoveStrategy()
		);

		GameOptions.changeScreenContent(section);
		game.startGame();
	}

	public prepareScreenEvents(): void {}
	public unregisterScreenEvents(): void {}
}
