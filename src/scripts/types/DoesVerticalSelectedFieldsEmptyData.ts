import { PlaygroundType } from "./PlaygroundType";

export interface DoesVerticalSelectedFieldsEmptyData {
	playground: PlaygroundType;
	currentCheckedColumn: number;
	firstRow: number;
	lastRow: number;
}
