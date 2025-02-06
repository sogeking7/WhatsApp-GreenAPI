import { verifySession } from "@/app/lib/session";
import { Response } from "@/types/api";
import { TReceiveNotification } from "@/types/green-api";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse<Response<TReceiveNotification>>> {
	try {
		const { idInstance, apiTokenInstance } = await verifySession();

		const apiUrl = `${process.env.NEXT_PUBLIC_GREEN_API_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

		const response = await fetch(apiUrl, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			return NextResponse.json(
				{ status: response.status, success: false, message: `HTTP Response Code: ${response.status}` },
				{ status: response.status }
			);
		}

		const data: TReceiveNotification = await response.json();
		return NextResponse.json({ success: true, data });
	} catch {
		return NextResponse.json({ success: false, message: "Internal Server Error", status: 500 }, { status: 500 });
	}
}
