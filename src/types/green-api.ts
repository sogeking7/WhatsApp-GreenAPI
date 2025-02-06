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

export type TReceiveNotification = {
	receiptId: number,
	body: {
		typeWebhook: "incomingMessageReceived";
		instanceData: {
			idInstance: number;
			wid: string;
			typeInstance: "whatsapp";
		};
		timestamp: number;
		idMessage: string;
		senderData: {
			chatId: string;
			sender: string;
			chatName: string;
			senderName: string;
			senderContactName: string;
		};
		messageData: {
			typeMessage: "textMessage";
			textMessageData: {
				textMessage: string;
			};
		}
	}
} | null;

export type TDeleteNotification = {
	result: boolean
}