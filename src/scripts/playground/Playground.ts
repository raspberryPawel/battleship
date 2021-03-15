import { GameOptions } from "../GameOptions";
import { Ship } from "../classes/Ship";

export abstract class Playground {
	public playgroundDOM: HTMLElement = document.createElement("div");
	public playground: number[][] = [];
	public playgroundShips: Ship[] = [];
	protected tempHighlightedFields: string[] = [];

	constructor() {
		this.preparePlayground();
	}

	protected preparePlayground() {
		for (let i = 0; i < GameOptions.playgroundFieldsCount; i++) {
			const fields: number[] = new Array(GameOptions.playgroundFieldsCount).fill(0);
			this.playground.push(fields);
		}
	}

	protected abstract preparePlaygroundDOMStructure(): void;
}
