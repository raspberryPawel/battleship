import { EventsDetails } from "./EventsDetails";

export class Events {
	public static readonly SHIP_WAS_SETTED = "shipWasSetted";
	public static readonly ROTATE_SHIP = "rotateShip";
	public static readonly GAME_END = "gameEnd";

	public static dispatchEvent = (event: string, data?: Partial<EventsDetails>) => {
		document.body.dispatchEvent(new CustomEvent(event, { detail: data }));
	};
}
