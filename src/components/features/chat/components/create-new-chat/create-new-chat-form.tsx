"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import { getContactInfo } from "@/app/actions/chat";
import { useChatsStore } from "@/stores/chats-store-provider";
import { Loader } from "lucide-react";

const CreateNewChartSchema = z.object({
  chatId: z.string().length(12, {
    message:
      "Введите корректный номер телефона в формате +X (XXX) - XXX - XX - XX",
  }),
});

type CreateNewChart = z.infer<typeof CreateNewChartSchema>;

export const CreateNewChatForm = ({
  setDialogOpen,
}: {
  setDialogOpen: (open: boolean) => void;
}) => {
  const chatsStore = useChatsStore((state) => state);

  const form = useForm<CreateNewChart>({
    resolver: zodResolver(CreateNewChartSchema),
    defaultValues: {
      chatId: "",
    },
  });

  const {
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (values: CreateNewChart) => {
    values.chatId = values.chatId.slice(1) + "@c.us";
    try {
      const { data } = await getContactInfo(values.chatId);
      chatsStore.addNewChat(data);
      setDialogOpen(false);
    } catch (e) {
      setError("root.serverError", {
        // @ts-expect-error
        message: e?.message || "Unknown error",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <FormField
          name={"chatId"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chat Id</FormLabel>
              <FormControl>
                <PhoneInput
                  defaultCountry={"KZ"}
                  placeholder={"(999) 999 99 99"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage>
          {errors.root?.serverError.message && errors.root?.serverError.message}
        </FormMessage>
        <div className={"w-full flex justify-end"}>
          <Button
            disabled={form.formState.isSubmitting || form.formState.isLoading}
            type="submit"
          >
            Create chat
            {(form.formState.isLoading || form.formState.isSubmitting) && (
              <Loader className="animate-spin size-4 text-white" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
