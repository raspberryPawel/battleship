import { ResolveMove } from "../types/ResolveMove";

export interface MoveStrategy {
	performMove: (checkIfFieldHasShip: (row: number, column: number) => boolean, resolveMove: ResolveMove) => void;
}
