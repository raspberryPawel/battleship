import { Game } from "../Game";
import { DoesSelectedFieldsEmptyData } from "./DoesSelectedFieldsEmptyData";
import { RowAndColumnIndex } from "./RowAndColumnIndex";

export class PlayerPlaygroundUtils {
	public static getRowAndColumnNumberFromClassName = (className: string): RowAndColumnIndex => {
		try {
			const currentRow = parseInt(className.split("_")[0].split("-")[1]);
			const currentColumn = parseInt(className.split("_")[1]);

			return {
				row: currentRow,
				column: currentColumn,
			};
		} catch {
			return {
				row: 0,
				column: 0,
			};
		}
	};

	public static doesSelectedFieldsEmpty = (data: DoesSelectedFieldsEmptyData): boolean => {
		const { playground, currentCheckedRow, firstColumn, lastColumn } = data;

		const fields = Game.currentSelectedShip?.shipOnPlayground.map((className) => {
            const { row, column } = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(className);
			return `${row}_${column}`;
		});

		const row = playground[currentCheckedRow];
		for (let i = firstColumn; i <= lastColumn; i++) {
			if (row[i] === 1 && !fields?.includes(`${currentCheckedRow}_${i}`)) {
				return false;
			}
		}
        
		return true;
	};

	public static doesSelectedNearbyFieldsEmpty = (data: DoesSelectedFieldsEmptyData): boolean => {
		const { playground, currentCheckedRow, firstColumn, lastColumn } = data;

		const row = playground[currentCheckedRow];
		const rowAbove = playground[currentCheckedRow - 1];
		const rowBelow = playground[currentCheckedRow + 1];

		if (rowAbove) {
			for (let i = firstColumn; i <= lastColumn; i++) {
				if (rowAbove[i] === 1) return false;
			}
		}

		if (rowBelow) {
			for (let i = firstColumn; i <= lastColumn; i++) {
				if (rowBelow[i] === 1) return false;
			}
		}

		if (row && row[firstColumn - 1] && row[firstColumn - 1] === 1) return false;
		if (rowAbove && rowAbove[firstColumn - 1] && rowAbove[firstColumn - 1] === 1) return false;
		if (rowBelow && rowBelow[firstColumn - 1] && rowBelow[firstColumn - 1] === 1) return false;

		// if (rowAbove && rowAbove[lastColumn + 1] && rowAbove[lastColumn + 1] === 1) return false;
		// if (row && row[lastColumn + 1] && row[lastColumn + 1] === 1) return false;
		// if (rowBelow && rowBelow[lastColumn + 1] && rowBelow[lastColumn + 1] === 1) return false;

		return true;
	};
}
