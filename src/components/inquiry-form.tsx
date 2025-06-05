
"use client";

import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from 'next/image';

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
import { Textarea } from "@/components/ui/textarea";
import { submitInquiry, InquiryFormState } from "@/app/actions";
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const initialState: InquiryFormState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        </>
      ) : (
        "Send Message"
      )}
    </Button>
  );
}

export default function InquiryForm() {
  const [state, formAction] = useActionState(submitInquiry, initialState);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success!" : "Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
      if (state.success) {
        form.reset();
      }
    }
  }, [state, toast, form]);

  return (
    <Card className="max-w-4xl mx-auto shadow-lg"> {/* Increased max-w for two columns */}
      <CardContent className="p-6 md:p-8">
        <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
          {/* Left Column */}
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h3 className="text-3xl font-bold mb-3 font-headline text-primary">Send us a message</h3>
            <p className="text-muted-foreground text-sm mb-2">
              We&apos;re all ears.
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              Send us a message and we&apos;ll hit you back faster than you can say &quot;Toodles!&quot;
            </p>
            <div className="relative w-full max-w-[250px] mx-auto md:mx-0 aspect-[250/200]">
              <Image
                src="/cont.png"
                alt="Contact envelope icon"
                layout="fill"
                objectFit="contain"
                data-ai-hint="message envelope"
              />
            </div>
          </div>

          {/* Right Column (Form) */}
          <Form {...form}>
            <form action={formAction} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage>{state.errors?.name?.[0]}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage>{state.errors?.email?.[0]}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Subject" {...field} />
                    </FormControl>
                    <FormMessage>{state.errors?.subject?.[0]}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Message"
                        className="resize-none"
                        rows={4} 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{state.errors?.message?.[0]}</FormMessage>
                  </FormItem>
                )}
              />
              <SubmitButton />
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
    
