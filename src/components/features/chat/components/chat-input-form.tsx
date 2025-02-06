"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Send } from "lucide-react";
import { sendMessage } from "@/app/actions/chat";
import { useChatStore } from "@/stores/chat-store";
import { TChatInputForm, ChatInputFormSchema } from "@/types/schema";

export const ChatInputForm = () => {
  const currentChatId = useChatStore((state) => state.currentChatId);

  const form = useForm<TChatInputForm>({
    resolver: zodResolver(ChatInputFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const {
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (values: TChatInputForm) => {
    if (!currentChatId) return;
    const { message } = values;
    const res = await sendMessage(currentChatId, message);
    if (res.success) {
      form.reset();
    } else {
      setError("root.serverError", {
        message: res.message
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"w-full h-full bg-white gap-2 border-t flex pt-2  px-4"}
      >
        <FormField
          name="message"
          render={({ field }) => (
            <FormItem className={"w-full"}>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder={"Enter message"}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {form.formState.isValid && (
          <Button
            disabled={form.formState.isSubmitting || form.formState.isLoading}
            type={"submit"}
            size={"icon"}
          >
            {form.formState.isLoading || form.formState.isSubmitting ? (
              <Loader className="animate-spin text-white" />
            ) : (
              <Send className={"text-white"} />
            )}
          </Button>
        )}
      </form>
      <FormMessage>
        {errors.root?.serverError.message && errors.root?.serverError.message}
      </FormMessage>
    </Form>
  );
};
