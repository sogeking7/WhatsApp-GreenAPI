"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";

const CreateNewChartSchema = z.object({
  chatId: z.string(),
});

type CreateNewChart = z.infer<typeof CreateNewChartSchema>;

export const CreateNewChatForm = () => {
  const form = useForm<CreateNewChart>({
    resolver: zodResolver(CreateNewChartSchema),
    defaultValues: {
      chatId: "",
    },
  });

  const onSubmit = (values: CreateNewChart) => {
    values.chatId = values.chatId.slice(1) + "@c.us";
    console.log(values);
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
            </FormItem>
          )}
        />
        <div className={"w-full flex justify-end"}>
          <Button type="submit">Create chat</Button>
        </div>
      </form>
    </Form>
  );
};
