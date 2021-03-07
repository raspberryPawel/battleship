import { ScreenType } from "../interfaces/GameScreen";
import "../styles/index.scss";
import { Game } from "./Game";
import { Playground } from "./Playground";
import { PlaygroundScreen } from "./PlaygroundScreen";
import { StartScreen } from "./StartScreen";

document.addEventListener("DOMContentLoaded", function (event) {
  const playgroundScreen = new PlaygroundScreen(null);
  const startScreen = new StartScreen(playgroundScreen);

  //   startScreen.prepareScreenEvents();
  Game.prepareScreen(startScreen);
  Game.currentScreen = startScreen;

 
});
