import { PlaygroundType } from "./PlaygroundType";

export interface DoesSelectedFieldsEmptyData {
	playground: PlaygroundType;
	currentCheckedRow: number;
	firstColumn: number;
	lastColumn: number;
}