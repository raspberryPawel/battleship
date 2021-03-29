import { GameOptions } from "../GameOptions";
import { PlayerPlaygroundUtils } from "../playground/PlayerPlaygroundUtils";
import { RowAndColumnIndex } from "../types/RowAndColumnIndex";
import { MoveStrategy } from "../types/MoveStrategy";
import { ResolveMove } from "../types/ResolveMove";
import { MoveDirection } from "./MoveDirection";
import { ShipDirection } from "../consts/ShipDirection";

export class SimpleComputerMoveStrategy implements MoveStrategy {
	private hitFields: string[] = [];
	private hitsInARow: number = 0;
	private shipDirection: ShipDirection = ShipDirection.horizontal;
	private moveDirection: MoveDirection = MoveDirection.Right;
	private firstHitField: RowAndColumnIndex = null;
	private availableShips: number[] = [];
	private availableFields: string[][] = [];
	private fieldsToCheckAfterHit: string[] = [];

	private resolveMove: ResolveMove;
	private checkIfFieldHasShip: (row: number, column: number) => boolean;

	constructor() {
		this.availableShips = [...GameOptions.availableShips].sort((shipA, shipB) => shipA - shipB);

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
		const areRowCorrect = row >= 0 && row < GameOptions.playgroundFieldsCount;
		const areColumnCorrect = column >= 0 && column < GameOptions.playgroundFieldsCount;

		if (areRowCorrect && areColumnCorrect) {
			const index = this.availableFields[row].indexOf(`${row}_${column}`);
			if (index !== -1) {
				this.availableFields[row].splice(index, 1);
			}
		}
	}

	private checkIFieldHasShip(row: number, column: number): boolean {
		const hasShip = this.checkIfFieldHasShip(row, column);
		let fieldWasHit = false;

		if (hasShip) this.hitFields.push(`${row}_${column}`);

		if (this.fieldsToCheckAfterHit.length && hasShip) {
			this.hitsInARow += 1;
			this.fieldsToCheckAfterHit.splice(0, 1);

			this.checkIfShipIsVerticalOrHorizontal();
			this.setMoveDirectionBasedOnNextFieldToHit(row, column);
			fieldWasHit = true;
		} else if (this.fieldsToCheckAfterHit.length && !hasShip) {
			this.removeFieldsWhereThereIsNoShips(row, column);
		}

		if (!this.fieldsToCheckAfterHit.length && hasShip && !fieldWasHit) {
			this.firstHitField = { row, column };

			this.setFieldsToCheckAfterHit(row, column);
			this.setMoveDirectionBasedOnNextFieldToHit(row, column);
		}

		const getIndexAndExcludeFieldsWhereThereIsNoShips = () => {
			const indexOfSunkShip = this.availableShips.indexOf(this.hitsInARow);

			this.availableShips.splice(indexOfSunkShip, 1);
			this.hitsInARow = 0;
			this.fieldsToCheckAfterHit.length = 0;
			this.firstHitField = null;

			this.excludeFieldsWhereThereIsNoShips();
		};

		this.checkIfLongestShipWasSunk(getIndexAndExcludeFieldsWhereThereIsNoShips);
		this.checkIfSomeShipWasSunk(getIndexAndExcludeFieldsWhereThereIsNoShips);

		return hasShip;
	}

	private checkIfShipIsVerticalOrHorizontal() {
		const isVertical = this.moveDirection === MoveDirection.Top || this.moveDirection === MoveDirection.Bottom;
		const isHorizontal = this.moveDirection === MoveDirection.Left || this.moveDirection === MoveDirection.Right;

		if (this.firstHitField && isHorizontal) {
			this.removeFieldsOnTop(this.firstHitField.row, this.firstHitField.column);
			this.removeFieldsOnBottom(this.firstHitField.row, this.firstHitField.column);
			this.shipDirection = ShipDirection.horizontal;
		} else if (this.firstHitField && isVertical) {
			this.shipDirection = ShipDirection.vertical;
		}
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
			const rowAndColumnA = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(a);
			const rowAndColumnB = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(b);

			return this.shipDirection === ShipDirection.vertical
				? rowAndColumnA.row - rowAndColumnB.row
				: rowAndColumnA.column - rowAndColumnB.column;
		});

		const firstHitField = this.hitFields[0];
		const lastHitField = this.hitFields[this.hitFields.length - 1];
		const firstRowAndColumn = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(firstHitField);
		const lastRowAndColumn = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(lastHitField);

		if (this.shipDirection === ShipDirection.vertical) {
			this.removeFieldFromAvailable(firstRowAndColumn.row - 1, firstRowAndColumn.column);
			this.removeFieldFromAvailable(lastRowAndColumn.row + 1, lastRowAndColumn.column);

			this.hitFields.forEach((field) => {
				const { row, column } = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field);
				const columnLeft = column - 1;
				const columnRight = column + 1;

				this.removeFieldFromAvailable(row, columnLeft);
				this.removeFieldFromAvailable(row, columnRight);
			});

			this.removeFieldFromAvailable(firstRowAndColumn.row - 1, firstRowAndColumn.column - 1);
			this.removeFieldFromAvailable(firstRowAndColumn.row - 1, firstRowAndColumn.column + 1);
			this.removeFieldFromAvailable(lastRowAndColumn.row + 1, lastRowAndColumn.column - 1);
			this.removeFieldFromAvailable(lastRowAndColumn.row + 1, lastRowAndColumn.column + 1);
		} else {
			const columnBefore = firstRowAndColumn.column - 1;
			const columnAfter = firstRowAndColumn.column + 1;
			const rowAbove = firstRowAndColumn.row + 1;
			const rowBelow = firstRowAndColumn.row - 1;

			this.removeFieldFromAvailable(rowAbove, columnBefore);
			this.removeFieldFromAvailable(firstRowAndColumn.row, columnBefore);
			this.removeFieldFromAvailable(firstRowAndColumn.row, columnAfter);
			this.removeFieldFromAvailable(rowBelow, columnBefore);

			this.hitFields.forEach((field) => {
				const { row, column } = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field);
				const rowAbove = row + 1;
				const rowBelow = row - 1;

				this.removeFieldFromAvailable(rowAbove, column);
				this.removeFieldFromAvailable(rowBelow, column);
			});

			this.removeFieldFromAvailable(lastRowAndColumn.row + 1, lastRowAndColumn.column - 1);
			this.removeFieldFromAvailable(lastRowAndColumn.row + 1, lastRowAndColumn.column + 1);
			this.removeFieldFromAvailable(lastRowAndColumn.row - 1, lastRowAndColumn.column - 1);
			this.removeFieldFromAvailable(lastRowAndColumn.row - 1, lastRowAndColumn.column + 1);
		}

		this.hitFields.length = 0;
	}

	private removeFieldsWhereThereIsNoShips(currentRow: number, currentColumn: number): void {
		if (this.moveDirection === MoveDirection.Right) {
			this.removeFieldsOnRight(currentRow, currentColumn);
			return;
		}

		if (this.moveDirection === MoveDirection.Left) {
			this.removeFieldsOnLeft(currentRow, currentColumn);
			return;
		}

		if (this.moveDirection === MoveDirection.Bottom) {
			this.removeFieldsOnBottom(currentRow, currentColumn);
			return;
		}

		if (this.moveDirection === MoveDirection.Top) {
			this.removeFieldsOnTop(currentRow, currentColumn);
			return;
		}
	}

	private removeFieldsOnLeft(currentRow: number, currentColumn: number) {
		const fieldsToRemove = this.fieldsToCheckAfterHit.filter((field: string) => {
			const { row, column } = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field);
			return row === currentRow && column <= currentColumn;
		});

		this.fieldsToCheckAfterHit.splice(0, fieldsToRemove.length);
		this.setMoveDirectionBasedOnNextFieldToHit(currentRow, currentColumn);
	}

	private removeFieldsOnRight(currentRow: number, currentColumn: number) {
		const fieldsToRemove = this.fieldsToCheckAfterHit.filter((field: string) => {
			const { row, column } = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field);
			return row === currentRow && column >= currentColumn;
		});

		this.fieldsToCheckAfterHit.splice(0, fieldsToRemove.length);
		this.setMoveDirectionBasedOnNextFieldToHit(currentRow, currentColumn);
	}

	private removeFieldsOnBottom(currentRow: number, currentColumn: number) {
		const fieldsToRemove = this.fieldsToCheckAfterHit.filter((field: string) => {
			const { row, column } = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field);
			return column === currentColumn && row >= currentRow;
		});
		const index = this.fieldsToCheckAfterHit.indexOf(fieldsToRemove[0]);
		if (index !== -1) this.fieldsToCheckAfterHit.splice(index, fieldsToRemove.length);

		this.setMoveDirectionBasedOnNextFieldToHit(currentRow, currentColumn);
	}

	private removeFieldsOnTop(currentRow: number, currentColumn: number) {
		const fieldsToRemove = this.fieldsToCheckAfterHit.filter((field: string) => {
			const { row, column } = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field);
			return column === currentColumn && row <= currentRow;
		});

		const index = this.fieldsToCheckAfterHit.indexOf(fieldsToRemove[0]);
		if (index !== -1) this.fieldsToCheckAfterHit.splice(index, fieldsToRemove.length);

		this.setMoveDirectionBasedOnNextFieldToHit(currentRow, currentColumn);
	}

	private setMoveDirectionBasedOnNextFieldToHit(currentRow: number, currentColumn: number): void {
		const { row, column } = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(this.fieldsToCheckAfterHit[0]);

		if (row === -1 && column === -1) {
			this.fieldsToCheckAfterHit.length = 0;
			this.moveDirection = MoveDirection.Right;
			return;
		}

		if (currentRow === row) this.moveDirection = column > currentColumn ? MoveDirection.Right : MoveDirection.Left;
		else this.moveDirection = row > currentRow ? MoveDirection.Bottom : MoveDirection.Top;
	}

	private setFieldsToCheckAfterHit(row: number, column: number): void {
		this.hitsInARow = 1;
		const longestShipToSink = Math.max(...this.availableShips);

		// left - right
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

		// top - bottom
		for (let i = row + 1; i < row + longestShipToSink; i++) {
			if (i < GameOptions.playgroundFieldsCount && this.availableFields[i].indexOf(`${i}_${column}`) !== -1)
				this.fieldsToCheckAfterHit.push(`${i}_${column}`);

			if (i < GameOptions.playgroundFieldsCount && this.availableFields[i].indexOf(`${i}_${column}`) === -1) break;
		}

		for (let i = row - 1; i > row - longestShipToSink; i--) {
			if (i >= 0 && this.availableFields[i].indexOf(`${i}_${column}`) !== -1)
				this.fieldsToCheckAfterHit.push(`${i}_${column}`);

			if (i >= 0 && this.availableFields[i].indexOf(`${i}_${column}`) === -1) break;
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
