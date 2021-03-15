import { ScreenType } from "../interfaces/GameScreen";
import { ComputerPlayground } from "./playground/ComputerPlayground";
import { PlayerPlayground } from "./playground/PlayerPlayground";
import { RowAndColumnIndex } from "./playground/RowAndColumnIndex";
import { Ship } from "./classes/Ship";

export class GameOptions {
	public static playgroundFieldsCount: number = 10;
	public static playgroundSize: number = window.innerWidth > 1200 ? 500 : window.innerWidth - 50;
	public static fieldSize: number = GameOptions.playgroundSize / GameOptions.playgroundFieldsCount - 4;

	public static availableShips: Array<number> = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
	public static currentScreen: ScreenType = null;
	public static currentSelectedShip: Ship | null;
	public static currentlySelectedField: RowAndColumnIndex | null = null;

	public static playerPlayground: PlayerPlayground;
	public static computerPlayground: ComputerPlayground;

	public static changeScreen = (nextScreen: ScreenType): void => {
		console.log("nextScreen => ", nextScreen);
		console.log("currentScreen => ", GameOptions.currentScreen?.nextScreen);

		if (nextScreen) {
			GameOptions.currentScreen?.unregisterScreenEvents();

			GameOptions.prepareScreen(nextScreen);
			GameOptions.currentScreen = nextScreen;
		}
	};

	public static prepareScreen(screen: ScreenType) {
		screen?.prepareScreen();
		screen?.prepareScreenEvents();
	}

	public static getMainDOMElement(): HTMLElement {
		return document.querySelector("main") as HTMLElement;
	}
}
