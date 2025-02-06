import { cache } from "react";
import { verifySession } from "../lib/session";
import { TGetWaSettings } from "@/types/green-api";

export const getUser = cache(async () => {
	const { idInstance, apiTokenInstance } = await verifySession();

	const url = `${process.env.NEXT_PUBLIC_GREEN_API_URL}/waInstance${idInstance}/getWaSettings/${apiTokenInstance}`;

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data: TGetWaSettings = await response.json();
	return data;
})