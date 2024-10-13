/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  Name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  Email: z.string().email({ message: "Please enter a valid email address." }),
  Message: z.string().min(10, {
    message: "Your message must be at least 10 characters.",
  }),
});

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Name: "",
      Email: "",
      Message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error sending email");
      }

      // const responseData = await response.json();
      // Handle response data as needed

      // Add toast here
      toast({
        variant: "default",
        title: "Message sent!",
        description: "We'll get back to you soon.",
      });

      // set loading to false
      setLoading(false);
      // reset the form
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Message not sent!",
        description: "We'll fix the problem ASAP.",
      });
      // Handle error as needed
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" variant="default" size={"lg"}>
            send
          </Button>
        )}
      </form>
    </Form>
  );
}
