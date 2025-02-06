export type TStateInstance =
	| "notAuthorized"
	| "authorized"
	| "blocked"
	| "sleepMode"
	| "starting"
	| "yellowCard";

export type TGetStateInstance = {
	stateInstance: TStateInstance;
};

export type TGetWaSettings = {
	avatar: string;
	phone: string;
};

export type TGetContactInfo = {
	avatar: string;
	name: string;
	chatId: string;
};

export type TSendMessage = {
	idMessage: string;
};