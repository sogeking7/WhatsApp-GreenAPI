import { Response } from "@/types/api";
import { TGetStateInstance } from "@/types/green-api";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse<Response<TGetStateInstance>>> {
	try {
		const { idInstance, apiTokenInstance } = await req.json();

		if (!idInstance || !apiTokenInstance) {
			return NextResponse.json({ success: false, message: "Missing parameters", status: 400 }, { status: 400 });
		}

		const apiUrl = `${process.env.NEXT_PUBLIC_GREEN_API_URL}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;

		const response = await fetch(apiUrl, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			return NextResponse.json(
				{ success: false, message: `HTTP Response Code: ${response.status}`, status: response.status },
				{ status: response.status }
			);
		}

		const data: TGetStateInstance = await response.json();
		return NextResponse.json({ success: true, data });
	} catch {
		return NextResponse.json({ success: false, message: "Internal Server Error", status: 500 }, { status: 500 });
	}
}
