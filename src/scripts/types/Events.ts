export class Events {
	public static readonly ALL_SHIPS_WAS_SETTED = "allShipsWasSetted";
	public static readonly SHIP_WAS_SETTED = "shipWasSetted";
	public static readonly ROTATE_SHIP = "rotateShip";

	public static dispatchEvent = (event: string) => {
		document.body.dispatchEvent(new CustomEvent(event));
	};
}
