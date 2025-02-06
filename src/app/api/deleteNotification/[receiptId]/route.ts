import { verifySession } from "@/app/lib/session";
import { Response } from "@/types/api";
import { TDeleteNotification } from "@/types/green-api";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: Promise<{ receiptId: string }> }): Promise<NextResponse<Response<TDeleteNotification>>> {
	try {
		const receiptId = (await params).receiptId;

		const { idInstance, apiTokenInstance } = await verifySession();

		const apiUrl = `${process.env.NEXT_PUBLIC_GREEN_API_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}`;

		const response = await fetch(apiUrl + `/${receiptId}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			return NextResponse.json(
				{ status: response.status, success: false, message: `HTTP Response Code: ${response.status}` },
				{ status: response.status }
			);
		}

		const data: TDeleteNotification = await response.json();
		return NextResponse.json({ success: true, data });
	} catch {
		return NextResponse.json({ success: false, message: "Internal Server Error", status: 500 }, { status: 500 });
	}
}
