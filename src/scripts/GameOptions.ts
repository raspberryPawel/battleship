import { ComputerPlayground } from "./playground/ComputerPlayground";
import { PlayerPlayground } from "./playground/PlayerPlayground";
import { RowAndColumnIndex } from "./types/RowAndColumnIndex";
import { Ship } from "./Ship";
import { GameScreen } from "../interfaces/GameScreen";

export class GameOptions {
	public static playgroundFieldsCount: number = 10;
	public static playgroundSize: number = window.innerWidth > 1200 ? 400 : Math.min(window.innerWidth - 100, 400);
	public static fieldSize: number = GameOptions.playgroundSize / GameOptions.playgroundFieldsCount - 4;
	public static availableShips: Array<number> = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
	
	public static currentScreen: GameScreen;
	public static currentSelectedShip: Ship;
	public static currentSelectedShipAfterClick: Ship;
	public static currentlySelectedField: RowAndColumnIndex = null;

	public static playerPlayground: PlayerPlayground;
	public static computerPlayground: ComputerPlayground;

	public static changeScreen = (nextScreen: GameScreen): void => {
		if (nextScreen) {
			GameOptions.currentScreen?.unregisterScreenEvents();

			GameOptions.prepareScreen(nextScreen);
			GameOptions.currentScreen = nextScreen;
		}
	};

	protected static prepareScreen(screen: GameScreen) {
		screen?.prepareScreen();
		screen?.prepareScreenEvents();
	}

	public static getMainDOMElement(): HTMLElement {
		return document.querySelector("main") as HTMLElement;
	}

	public static clearMainDOMElement(): void {
		this.getMainDOMElement().innerHTML = "";
	}

	public static changeScreenContent(newContent: HTMLElement): void {
		this.clearMainDOMElement();
		this.getMainDOMElement().append(newContent);
	}
}
