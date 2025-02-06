export type SuccessResponse<T> = {
	success: true;
	data: T;
};

export type ErrorResponse = {
	success: false;
	message: string;
	status: string | number;
};

export type Response<T> = SuccessResponse<T> | ErrorResponse;