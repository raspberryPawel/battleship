import { ShipDirection } from "../consts/ShipDirection";
import { GameOptions } from "../GameOptions";
import { DoesSelectedFieldsEmptyData } from "../types/DoesSelectedFieldsEmptyData";
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

	public static doesFieldsAvailable = (data: DoesSelectedFieldsEmptyData): boolean => {
		const { playground, currentChecked, first, last, shipDirection } = data;
		const isHorizontal = shipDirection === ShipDirection.horizontal;
		const { doesFieldEmpty } = PlayerPlaygroundUtils;

		for (let i = first - 1; i < last + 1; i++) {
			if ((i >= 0 && i < GameOptions.playgroundFieldsCount)) {
				const doesFieldAvailable = isHorizontal
					? doesFieldEmpty(playground, currentChecked, i)
					: doesFieldEmpty(playground, i, currentChecked);

				if (!doesFieldAvailable) return false;
			}
		}

		for (let i = first - 1; i < last + 1; i++) {
			if ((i >= 0 && i < GameOptions.playgroundFieldsCount)) {
				const doesFieldAvailable = isHorizontal
					? doesFieldEmpty(playground, currentChecked - 1, i)
					: doesFieldEmpty(playground, i, currentChecked - 1);

				if (!doesFieldAvailable) return false;
			}
		}

		for (let i = first - 1; i < last + 1; i++) {
			if ((i >= 0 && i < GameOptions.playgroundFieldsCount)) {
				const doesFieldAvailable = isHorizontal
					? doesFieldEmpty(playground, currentChecked + 1, i)
					: doesFieldEmpty(playground, i, currentChecked + 1);

				if (!doesFieldAvailable) return false;
			}
		}

		return true;
	};

	public static isMobile() {
		return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	}

	protected static doesFieldEmpty = (playground: PlaygroundType, row: number, column: number) => {
		const areRowCorrect = row >= 0 && row < GameOptions.playgroundFieldsCount;
		const areColumnCorrect = column >= 0 && column < GameOptions.playgroundFieldsCount;

		if (areRowCorrect && areColumnCorrect) {
			if (playground[row][column]) return false;
			else return true;
		}

		return true;
	};
}
