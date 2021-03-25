import { GameOptions } from "../GameOptions";
import { Playground } from "./Playground";
import { Ship } from "../Ship";

export class ComputerPlayground extends Playground {
	public playgroundShips: Ship[] = [];
	protected showShipsOnPlayground: boolean = true;
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
			const ship = new Ship(shipSize, this.addShipToPlayground);
			this.playgroundShips.push(ship);
		});
	}

	protected addShipToPlayground = () => {
		this.shipsOnPlaygrundCount++;
	};
}
