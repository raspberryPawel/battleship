import { GameScreen } from "../../interfaces/GameScreen";
import { Game } from "../Game";
import { PlayerMoveStrategy } from "../moveStrategies/PlayerMoveStrategy";
import { GameOptions } from "../GameOptions";
import { ComputerPlayground } from "../playground/ComputerPlayground";
import { SimpleComputerMoveStrategy } from "../moveStrategies/SimpleComputerMoveStrategy";
import confetti from "canvas-confetti";
import { Events } from "../types/Events";
import { PlayerType } from "../consts/PlayerType";
import { PlaygroundScreen } from "./PlaygroundScreen";
import { StartScreen } from "./StartScreen";

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

	protected onGameEnd = (e: Event) => {
		const event = e as CustomEvent;
		const whoWin = event?.detail?.win;

		const modalTitle: HTMLElement = document.querySelector(".modal-title");
		if (modalTitle)
			modalTitle.innerText = whoWin === PlayerType.player ? "Congratulation you win 👏" : "Ups, you lose.. 😪";

		const message = document.createElement("div");

		const buttonPlayAgain = document.createElement("button");
		buttonPlayAgain.setAttribute("class", "btn-play-again");
		buttonPlayAgain.addEventListener("click", this.playAgain);
		buttonPlayAgain.innerText = "Play once more!";

		const text = document.createElement("strong");
		text.innerText = whoWin === PlayerType.player ? "🎉🎉🎉🎉🎉🎉🎉🎉" : "😥😥😥😥😥😥😥😥";

		message.appendChild(text);
		message.appendChild(buttonPlayAgain);

		const modalMessage: HTMLElement = document.querySelector(".modal-message");
		if (modalMessage) {
			modalMessage.innerHTML = "";
			modalMessage.appendChild(message);
		}

		window.location.hash = "open-modal";

		const confettiCanvas = document.createElement("canvas");
		confettiCanvas.classList.add("confettiCanvas");

		document.body.appendChild(confettiCanvas);

		var myConfetti = confetti.create(confettiCanvas, {
			resize: true,
			useWorker: true,
		});

		myConfetti({
			particleCount: 150,
			spread: 160,
		});
	};

	public playAgain = () => {
		const playGameScreen = new PlayGameScreen(null);
		const playgroundScreen = new PlaygroundScreen(playGameScreen);
		const startScreen = new StartScreen(playgroundScreen);

		this.unregisterScreenEvents();

		window.location.hash = "";
		GameOptions.changeScreen(startScreen);
	};

	public prepareScreenEvents(): void {
		document.body.addEventListener(Events.GAME_END, this.onGameEnd);
	}
	public unregisterScreenEvents(): void {
		document.body.removeEventListener(Events.GAME_END, this.onGameEnd);

		const confettiCanvas = document.querySelector(".confettiCanvas");
		if (confettiCanvas) confettiCanvas.remove();

		const buttonPlayAgain = document.querySelector(".btn-play-again");
		if (buttonPlayAgain) buttonPlayAgain.removeEventListener("click", this.playAgain);
	}
}
