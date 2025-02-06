"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Send } from "lucide-react";

const ChatInputFormSchema = z.object({
  message: z.string().nonempty(),
});

type ChatInputFormType = z.infer<typeof ChatInputFormSchema>;

export const ChatInputForm = () => {
  const form = useForm({
    resolver: zodResolver(ChatInputFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (values: ChatInputFormType) => {
    console.log(values);
    form.reset();
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
    </Form>
  );
};
