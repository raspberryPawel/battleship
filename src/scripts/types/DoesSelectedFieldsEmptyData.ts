import { ShipDirection } from "../consts/ShipDirection";
import { PlaygroundType } from "./PlaygroundType";

export interface DoesSelectedFieldsEmptyData {
	playground: PlaygroundType;
	currentChecked: number;
	first: number;
	last: number;
	shipDirection: ShipDirection
}