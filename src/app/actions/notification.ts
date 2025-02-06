import { Response } from "@/types/api";
import { TDeleteNotification, TReceiveNotification } from "@/types/green-api";

export const receiveNotification = async () => {
	const response = await fetch("/api/getContactInfo", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const res: Response<TReceiveNotification> = await response.json();

	return res;
};

export const deleteNotification = async (receiptId: string) => {
	const response = await fetch(`/api/sendMessage/${receiptId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const res: Response<TDeleteNotification> = await response.json();

	return res;

};
