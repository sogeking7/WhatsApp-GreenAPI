import { z } from "zod";

export const SignInFormSchema = z.object({
	idInstance: z
		.string()
		.min(2, { message: "Id Instance must be at least 2 characters long." })
		.trim(),
	apiTokenInstance: z
		.string()
		.min(2, {
			message: "Api Token Instance must be at least 2 characters long.",
		})
		.trim(),
});

export type TSignInForm = z.infer<typeof SignInFormSchema>;



export const CreateNewChartFormSchema = z.object({
	chatId: z.string().length(12, {
		message:
			"Введите корректный номер телефона в формате +X (XXX) - XXX - XX - XX",
	}),
});

export type TCreateNewChatForm = z.infer<typeof CreateNewChartFormSchema>;



export const ChatInputFormSchema = z.object({
	message: z.string().nonempty(),
});

export type TChatInputForm = z.infer<typeof ChatInputFormSchema>;