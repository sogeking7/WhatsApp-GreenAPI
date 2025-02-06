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
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import { getContactInfo } from "@/app/actions/chat";
import { Loader } from "lucide-react";
import { useChatStore } from "@/stores/chat-store";
import { TCreateNewChatForm, CreateNewChartFormSchema } from "@/types/schema";

export const CreateNewChatForm = ({
  setDialogOpen,
}: {
  setDialogOpen: (open: boolean) => void;
}) => {
  const addNewChat = useChatStore((state) => state.addNewChat);

  const form = useForm<TCreateNewChatForm>({
    resolver: zodResolver(CreateNewChartFormSchema),
    defaultValues: {
      chatId: "",
    },
  });

  const {
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (values: TCreateNewChatForm) => {
    values.chatId = values.chatId.slice(1) + "@c.us";
    const res = await getContactInfo(values.chatId);
    if (res.success) {
      addNewChat(res.data);
      setDialogOpen(false);
    } else {
      setError("root.serverError", {
        message: res.message
      });
    }
  }

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
