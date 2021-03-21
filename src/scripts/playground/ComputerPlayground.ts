import { GameOptions } from "../GameOptions";
import { Playground } from "./Playground";
import { Ship } from "../classes/Ship";

export class ComputerPlayground extends Playground {
	public playgroundShips: Ship[] = [];
	protected shipsOnPlaygrundCount: number = 0;
	protected showShipsOnPlayground: boolean = false;
	protected playgroundClassPrefix: string = "computer-playground";

	constructor() {
		super();
		this.prepareComputerShips();
		this.preparePlaygroundDOMStructure();
		this.randomizeShipsPosition();
	}

	public randomizeShipsPosition = () => {
		this.clearPlayground();
		this.randomizeShipsPositions();
	};

	protected addListenerOnPlaygroundField = (div: HTMLElement) => {};
	private prepareComputerShips() {
		GameOptions.availableShips.forEach((shipSize) => {
			const ship = new Ship(shipSize);
			this.playgroundShips.push(ship);
		});
	}
}
