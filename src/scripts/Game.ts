import { ScreenType } from "../interfaces/GameScreen";

export class Game {
  public static playgroundFieldsCount: number = 10;
  public static playgroundSize: number =
    window.innerWidth > 1200 ? 500 : window.innerWidth - 50;
  public static fieldSize: number = (Game.playgroundSize / Game.playgroundFieldsCount) - 4;

  public static availableShips: Array<number> = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  public static currentScreen: ScreenType = null;

  public static changeScreen(nextScreen: ScreenType): void {
    console.log("nextScreen => ", nextScreen);
    console.log("currentScreen => ", this.currentScreen?.nextScreen);

    if (this.currentScreen?.nextScreen) {
      this.currentScreen?.unregisterScreenEvents();

      this.prepareScreen(this.currentScreen?.nextScreen);
      this.currentScreen = nextScreen;
    }
  }

  public static prepareScreen(screen: ScreenType) {
    screen?.prepareScreen();
    screen?.prepareScreenEvents();
  }

  public static getMainDOMElement(): HTMLElement {
    return document.querySelector("main") as HTMLElement;
  }
}
