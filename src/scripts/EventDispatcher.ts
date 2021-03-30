import { PlayerType } from "./consts/PlayerType";

interface EventsDetails {
	win?: PlayerType;
}

export class EventDispatcher {
	public static dispatch = (event: string, data?: Partial<EventsDetails>) => {
		document.body.dispatchEvent(new CustomEvent(event, { detail: data }));
	};
}
