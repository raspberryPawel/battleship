import "../styles/index.scss";
import { GameOptions } from "./GameOptions";
import { PlayGameScreen } from "./screens/PlayGameScreen";
import { PlaygroundScreen } from "./screens/PlaygroundScreen";
import { StartScreen } from "./screens/StartScreen";

document.addEventListener("DOMContentLoaded", function() {
	const playGameScreen = new PlayGameScreen(null);
	const playgroundScreen = new PlaygroundScreen(playGameScreen);
	const startScreen = new StartScreen(playgroundScreen);

	GameOptions.changeScreen(startScreen);
});
