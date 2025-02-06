import { verifySession } from "@/app/lib/session";
import { Response } from "@/types/api";
import { TSendMessage } from "@/types/green-api";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse<Response<TSendMessage>>> {
	try {
		const { chatId, message } = await req.json();

		const { idInstance, apiTokenInstance } = await verifySession();

		const apiUrl = `${process.env.NEXT_PUBLIC_GREEN_API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

		const response = await fetch(apiUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ chatId, message })
		});

		if (!response.ok) {
			return NextResponse.json(
				{ status: response.status, success: false, message: `HTTP Response Code: ${response.status}` },
				{ status: response.status }
			);
		}

		const data: TSendMessage = await response.json();
		return NextResponse.json({ success: true, data });
	} catch {
		return NextResponse.json({ success: false, message: "Internal Server Error", status: 500 }, { status: 500 });
	}
}
