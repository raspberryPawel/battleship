import { ResolveMove } from "../types/ResolveMove";

export interface MoveStrategy {
	performMove: (enemyPlayground: number[][], resolveMove: ResolveMove) => void;
}
