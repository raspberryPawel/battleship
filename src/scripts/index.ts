import "../styles/index.scss";
import { GameOptions } from "./GameOptions";
import { PlaygroundScreen } from "./screens/PlaygroundScreen";
import { PlayGameScreen } from "./screens/PlayGameScreen";
import { StartScreen } from "./screens/StartScreen";

document.addEventListener("DOMContentLoaded", function (event) {
  const playGameScreen = new PlayGameScreen(null);
  const playgroundScreen = new PlaygroundScreen(playGameScreen);
  const startScreen = new StartScreen(playgroundScreen);

  //   startScreen.prepareScreenEvents();
  GameOptions.prepareScreen(startScreen);
  GameOptions.currentScreen = startScreen;
});
