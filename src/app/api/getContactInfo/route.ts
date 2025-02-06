import { verifySession } from "@/app/lib/session";
import { Response } from "@/types/api";
import { TGetContactInfo } from "@/types/green-api";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse<Response<TGetContactInfo>>> {
	try {
		const { chatId } = await req.json();

		const { idInstance, apiTokenInstance } = await verifySession();

		const apiUrl = `${process.env.NEXT_PUBLIC_GREEN_API_URL}/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`;

		const response = await fetch(apiUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ chatId })
		});

		if (!response.ok) {
			return NextResponse.json(
				{ status: response.status, success: false, message: `HTTP Response Code: ${response.status}` },
				{ status: response.status }
			);
		}

		const data: TGetContactInfo = await response.json();
		return NextResponse.json({ success: true, data });
	} catch {
		return NextResponse.json({ success: false, message: "Internal Server Error", status: 500 }, { status: 500 });
	}
}
