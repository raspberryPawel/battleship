import { GameOptions } from "../GameOptions";
import { PlayerPlaygroundUtils } from "../playground/PlayerPlaygroundUtils";
import { RowAndColumnIndex } from "../playground/RowAndColumnIndex";
import { MoveStrategy } from "../types/MoveStrategy";
import { ResolveMove } from "../types/ResolveMove";
import { MoveDirection } from "./MoveDirection";

export class SimpleComputerMoveStrategy implements MoveStrategy {
	private availableShips: number[] = [];
	private availableFields: string[][] = [];

	private hitFields: string[] = [];
	private fieldsToCheckAfterHit: string[] = [];

	private hitsInARow: number = 0;
	private moveDirection: MoveDirection = MoveDirection.Right;

	private checkIfFieldHasShip: (row: number, column: number) => boolean = (row: number, column: number) => false;
	private resolveMove: ResolveMove = () => {};

	constructor() {
		this.availableShips = GameOptions.availableShips.sort((shipA, shipB) => shipA - shipB);

		for (let i = 0; i < GameOptions.playgroundFieldsCount; i++) {
			const row = [];
			for (let j = 0; j < GameOptions.playgroundFieldsCount; j++) {
				row[j] = `${i}_${j}`;
			}

			this.availableFields.push(row);
		}
	}

	public performMove(checkIfFieldHasShip: (row: number, column: number) => boolean, resolveMove: ResolveMove): void {
		this.checkIfFieldHasShip = checkIfFieldHasShip;
		this.resolveMove = resolveMove;

		const { row, column } = this.selectFieldToHit();
		const field = document.querySelector(`.player-playground-${row}_${column}`) as HTMLElement;

		this.checkIFieldHasShip(row, column) ? field.classList.add("hit_field") : field.classList.add("misplaced_field");
		this.removeFieldFromAvailable(row, column);
		this.resolveMove(true);
	}

	private removeFieldFromAvailable(row: number, column: number): void {
		const index = this.availableFields[row].indexOf(`${row}_${column}`);
		if (index !== -1) this.availableFields[row].splice(index, 1);
	}

	private checkIFieldHasShip(row: number, column: number): boolean {
		const hasShip = this.checkIfFieldHasShip(row, column);
		if (hasShip) this.hitFields.push(`${row}_${column}`);

		if (this.fieldsToCheckAfterHit.length && hasShip) {
			this.hitsInARow += 1;
			this.fieldsToCheckAfterHit.splice(0, 1);

			this.setMoveDirectionBasedOnNextFieldToHit(column);
		} else if (this.fieldsToCheckAfterHit.length && !hasShip) {
			this.removeFieldsWhereThereIsNoShips(column);
		}

		if (!this.fieldsToCheckAfterHit.length && hasShip) {
			this.setFieldsToCheckAfterHit(row, column);
			this.setMoveDirectionBasedOnNextFieldToHit(column);
		}

		const getIndexAndExcludeFieldsWhereThereIsNoShips = () => {
			const indexOfSunkShip = this.availableShips.indexOf(this.hitsInARow);

			this.availableShips.splice(indexOfSunkShip, 1);
			this.hitsInARow = 0;
			this.fieldsToCheckAfterHit.length = 0;
			this.excludeFieldsWhereThereIsNoShips();
		};

		this.checkIfLongestShipWasSunk(getIndexAndExcludeFieldsWhereThereIsNoShips);
		this.checkIfSomeShipWasSunk(getIndexAndExcludeFieldsWhereThereIsNoShips);

		return hasShip;
	}

	private checkIfLongestShipWasSunk(getIndexAndExcludeFieldsWhereThereIsNoShips: () => void): void {
		if (this.hitsInARow === Math.max(...this.availableShips)) {
			getIndexAndExcludeFieldsWhereThereIsNoShips();
		}
	}

	private checkIfSomeShipWasSunk(getIndexAndExcludeFieldsWhereThereIsNoShips: () => void): void {
		if (!this.fieldsToCheckAfterHit.length && this.hitsInARow > 0) {
			getIndexAndExcludeFieldsWhereThereIsNoShips();
		}
	}

	private excludeFieldsWhereThereIsNoShips(): void {
		this.hitFields.sort((a: string, b: string) => {
			const columnA = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(a).column;
			const columnB = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(b).column;

			return columnA - columnB;
		});

		const firstHitField = this.hitFields[0];
		const lastHitField = this.hitFields[this.hitFields.length - 1];
		const firstRowAndColumn = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(firstHitField);
		const lastRowAndColumn = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(lastHitField);

		this.hitFields.forEach((field) => {
			const { row, column } = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field);
			const rowAbove = row + 1;
			const rowBelow = row - 1;

			if (rowAbove >= 0 && rowAbove < GameOptions.playgroundFieldsCount)
				this.removeFieldFromAvailable(rowAbove, column);
			if (rowBelow >= 0 && rowBelow < GameOptions.playgroundFieldsCount)
				this.removeFieldFromAvailable(rowBelow, column);
		});

		const columnBefore = firstRowAndColumn.column - 1;
		const rowAbove = firstRowAndColumn.row + 1;
		const rowBelow = firstRowAndColumn.row - 1;

		if (columnBefore >= 0 && columnBefore < GameOptions.playgroundFieldsCount) {
			if (rowAbove >= 0 && rowAbove < GameOptions.playgroundFieldsCount)
				this.removeFieldFromAvailable(rowAbove, columnBefore);

			if (rowBelow >= 0 && rowBelow < GameOptions.playgroundFieldsCount)
				this.removeFieldFromAvailable(rowBelow, columnBefore);
		}

		if (lastRowAndColumn.column + 1 < GameOptions.playgroundFieldsCount) {
			if (lastRowAndColumn.row + 1 < GameOptions.playgroundFieldsCount) {
				this.removeFieldFromAvailable(lastRowAndColumn.row + 1, lastRowAndColumn.column + 1);
			}

			if (lastRowAndColumn.row - 1 >= 0) {
				this.removeFieldFromAvailable(lastRowAndColumn.row - 1, lastRowAndColumn.column + 1);
			}
		}

		this.hitFields.length = 0;
	}

	private removeFieldsWhereThereIsNoShips(currentColumn: number): void {
		if (this.moveDirection === MoveDirection.Right) {
			const fieldsToRemove = this.fieldsToCheckAfterHit.filter((field: string) => {
				const { column } = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field);
				return column >= currentColumn;
			});

			this.fieldsToCheckAfterHit.splice(0, fieldsToRemove.length);
			this.setMoveDirectionBasedOnNextFieldToHit(currentColumn);

			return;
		}

		if (this.moveDirection === MoveDirection.Left) {
			const fieldsToRemove = this.fieldsToCheckAfterHit.filter((field: string) => {
				const { column } = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field);
				return column <= currentColumn;
			});

			this.fieldsToCheckAfterHit.splice(0, fieldsToRemove.length);

			return;
		}
	}

	private setMoveDirectionBasedOnNextFieldToHit(currentColumn: number): void {
		const { column } = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(this.fieldsToCheckAfterHit[0]);
		this.moveDirection = column > currentColumn ? MoveDirection.Right : MoveDirection.Left;
	}

	private setFieldsToCheckAfterHit(row: number, column: number): void {
		this.hitsInARow = 1;
		const longestShipToSink = Math.max(...this.availableShips);

		for (let i = column + 1; i < column + longestShipToSink; i++) {
			if (i < GameOptions.playgroundFieldsCount && this.availableFields[row].indexOf(`${row}_${i}`) !== -1)
				this.fieldsToCheckAfterHit.push(`${row}_${i}`);

			if (this.availableFields[row].indexOf(`${row}_${i}`) === -1) break;
		}

		for (let i = column - 1; i > column - longestShipToSink; i--) {
			if (i >= 0 && this.availableFields[row].indexOf(`${row}_${i}`) !== -1)
				this.fieldsToCheckAfterHit.push(`${row}_${i}`);

			if (this.availableFields[row].indexOf(`${row}_${i}`) === -1) break;
		}
	}

	private selectRandomFieldToHit(): RowAndColumnIndex {
		const availableRowsIndexes = this.getAvailableRowIndexes();
		const selectedIndex = Math.floor(Math.random() * availableRowsIndexes.length);

		const row = this.availableFields[availableRowsIndexes[selectedIndex]];
		const column = row[Math.floor(Math.random() * row.length)];

		return PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(column);
	}

	private selectFieldToHit(): RowAndColumnIndex {
		const longestShip = Math.max(...this.availableShips);

		if (this.fieldsToCheckAfterHit.length && this.hitsInARow !== longestShip) {
			return PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(this.fieldsToCheckAfterHit[0]);
		} else if (this.fieldsToCheckAfterHit.length && this.hitsInARow > 0 && this.hitsInARow === longestShip) {
			this.availableShips.splice(0, 1);
			this.fieldsToCheckAfterHit.length = 0;
			this.hitsInARow = 0;
		}

		return this.selectRandomFieldToHit();
	}

	private getAvailableRowIndexes(): number[] {
		return this.availableFields
			.map((row, index) => {
				return row.length ? index : null;
			})
			.filter((index) => index !== null) as number[];
	}
}
