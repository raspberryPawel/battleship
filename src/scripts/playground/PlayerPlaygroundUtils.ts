import { GameOptions } from "../GameOptions";
import { DoesSelectedFieldsEmptyData } from "../types/DoesSelectedFieldsEmptyData";
import { DoesVerticalSelectedFieldsEmptyData } from "../types/DoesVerticalSelectedFieldsEmptyData";
import { PlaygroundType } from "../types/PlaygroundType";
import { RowAndColumnIndex } from "../types/RowAndColumnIndex";

export class PlayerPlaygroundUtils {
	public static getRowAndColumnNumberFromClassName = (className: string): RowAndColumnIndex => {
		const defaultRowAndColumn = {
			row: -1,
			column: -1,
		};

		try {
			const regex = /[0-9]_[0-9]/g;
			const matches = className.match(regex);

			if (matches?.length) {
				const rowAndColumn = matches[0];

				return {
					row: parseInt(rowAndColumn[0]),
					column: parseInt(rowAndColumn[2]),
				};
			}

			return defaultRowAndColumn;
		} catch {
			return defaultRowAndColumn;
		}
	};

	public static doesSelectedFieldsEmpty = (data: DoesSelectedFieldsEmptyData): boolean => {
		const { playground, currentCheckedRow, firstColumn, lastColumn } = data;
		const { doesFieldEmpty, getCurrentlySelectedShipFields } = PlayerPlaygroundUtils;

		const fields = getCurrentlySelectedShipFields();
		for (let i = firstColumn; i <= lastColumn; i++) {
			if (!doesFieldEmpty(playground, currentCheckedRow, i) && !fields?.includes(`${currentCheckedRow}_${i}`))
				return false;
		}

		return true;
	};

	public static doesVerticalSelectedFieldsEmpty = (data: DoesVerticalSelectedFieldsEmptyData): boolean => {
		const { playground, currentCheckedColumn, firstRow, lastRow } = data;
		const { doesFieldEmpty, getCurrentlySelectedShipFields } = PlayerPlaygroundUtils;

		const fields = getCurrentlySelectedShipFields();
		for (let i = firstRow; i <= lastRow; i++) {
			if (!doesFieldEmpty(playground, i, currentCheckedColumn) && !fields?.includes(`${i}_${currentCheckedColumn}`))
				return false;
		}

		return true;
	};

	protected static getCurrentlySelectedShipFields() {
		return GameOptions.currentSelectedShip?.shipOnPlayground.map((className: string) => {
			const { row, column } = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(className);
			return `${row}_${column}`;
		});
	}

	public static doesSelectedNearbyFieldsEmpty = (data: DoesSelectedFieldsEmptyData): boolean => {
		const { playground, currentCheckedRow, firstColumn, lastColumn } = data;
		const { doesFieldEmpty } = PlayerPlaygroundUtils;

		for (let i = firstColumn; i <= lastColumn; i++) {
			if (!doesFieldEmpty(playground, currentCheckedRow - 1, i)) return false;
		}

		for (let i = firstColumn; i <= lastColumn; i++) {
			if (!doesFieldEmpty(playground, currentCheckedRow + 1, i)) return false;
		}

		if (!doesFieldEmpty(playground, currentCheckedRow, firstColumn - 1)) return false;
		if (!doesFieldEmpty(playground, currentCheckedRow + 1, firstColumn - 1)) return false;
		if (!doesFieldEmpty(playground, currentCheckedRow - 1, firstColumn - 1)) return false;

		return true;
	};

	public static doesVerticalSelectedNearbyFieldsEmpty = (data: DoesVerticalSelectedFieldsEmptyData): boolean => {
		const { playground, currentCheckedColumn, firstRow, lastRow } = data;
		const { doesFieldEmpty } = PlayerPlaygroundUtils;

		for (let i = firstRow; i <= lastRow; i++) {
			if (!doesFieldEmpty(playground, i, currentCheckedColumn - 1)) return false;
		}

		for (let i = firstRow; i <= lastRow; i++) {
			if (!doesFieldEmpty(playground, i, currentCheckedColumn + 1)) return false;
		}

		if (!doesFieldEmpty(playground, firstRow - 1, currentCheckedColumn)) return false;
		if (!doesFieldEmpty(playground, lastRow - 1, currentCheckedColumn)) return false;
		if (!doesFieldEmpty(playground, firstRow - 1, currentCheckedColumn - 1)) return false;
		if (!doesFieldEmpty(playground, firstRow - 1, currentCheckedColumn + 1)) return false;

		return true;
	};

	protected static doesFieldEmpty = (playground: PlaygroundType, row: number, column: number) => {
		const areRowCorrect = row >= 0 && row < GameOptions.playgroundFieldsCount;
		const areColumnCorrect = column >= 0 && column < GameOptions.playgroundFieldsCount;

		if (areRowCorrect && areColumnCorrect) {
			if (playground[row][column]) return false;
			else return true;
		}

		return true;
	};

	public static isMobile() {
		return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	}
}
