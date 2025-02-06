import { createSession, deleteSession } from "@/app/lib/session";
import { TGetStateInstance } from "@/types/green-api";
import { Response } from "@/types/api";
import { TSignInForm } from "@/types/schema";

export async function signIn(values: TSignInForm) {
	const response = await fetch("/api/getStateInstance", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});

	const res: Response<TGetStateInstance> = await response.json();

	if (res.success && res.data.stateInstance === "authorized") {
		await createSession(values);
	}

	return res;
}

export async function signOut() {
	await deleteSession();
}
