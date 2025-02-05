"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { SignInForm, SignInFormSchema } from "@/lib/definitions";
import { signIn } from "@/app/actions/auth";
import { Loader } from "lucide-react";
import { useState } from "react";
import { redirect } from "next/navigation";

export const LoginForm = () => {
  const [error, setError] = useState<string>("");
  const form = useForm<SignInForm>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      idInstance: "7103186490",
      apiTokenInstance: "391ee1b435154c3a95dcc8af3fa421e47d030ae4f59042f980",
    },
  });

  const onSubmit = async (values: SignInForm) => {
    const stateInstance = await signIn(values);
    if (stateInstance === "authorized") {
      redirect("/chat");
    } else {
      setError(stateInstance);
    }
  };

  return (
    <Form {...form}>
      <form
        className="max-w-[320px] w-full space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="idInstance"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Id Instance</FormLabel>
              <FormControl>
                <Input placeholder="Id Instance" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="apiTokenInstance"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Api Token Instance</FormLabel>
              <FormControl>
                <Input placeholder="Api Token Instance" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage>{error && error}</FormMessage>
        <Button
          disabled={form.formState.isSubmitting || form.formState.isLoading}
          className="w-full"
          type="submit"
        >
          Sign in
          {(form.formState.isLoading || form.formState.isSubmitting) && (
            <Loader className="animate-spin size-4 text-white" />
          )}
        </Button>
      </form>
    </Form>
  );
};
