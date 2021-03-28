import { ScreenType } from "../interfaces/GameScreen";
import { ComputerPlayground } from "./playground/ComputerPlayground";
import { PlayerPlayground } from "./playground/PlayerPlayground";
import { RowAndColumnIndex } from "./types/RowAndColumnIndex";
import { Ship } from "./Ship";
import { Events } from "./types/Events";

export class GameOptions {
	public static playgroundFieldsCount: number = 10;
	public static playgroundSize: number = window.innerWidth > 1200 ? 400 : Math.min(window.innerWidth - 100, 400);
	public static fieldSize: number = GameOptions.playgroundSize / GameOptions.playgroundFieldsCount - 4;

	public static availableShips: Array<number> = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
	public static currentScreen: ScreenType = null;
	public static currentSelectedShip: Ship | null;
	public static currentSelectedShipAfterClick: Ship | null;
	public static currentlySelectedField: RowAndColumnIndex | null = null;

	public static playerPlayground: PlayerPlayground;
	public static computerPlayground: ComputerPlayground;

	public static changeScreen = (nextScreen: ScreenType): void => {
		if (nextScreen) {
			GameOptions.currentScreen?.unregisterScreenEvents();

			GameOptions.prepareScreen(nextScreen);
			GameOptions.currentScreen = nextScreen;
		}
	};

	protected static prepareScreen(screen: ScreenType) {
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

	public static dispatchEvent = (event: string, data: any) => {
		document.body.dispatchEvent(
			new CustomEvent(event, {
				detail: data,
			})
		);
	};
}
