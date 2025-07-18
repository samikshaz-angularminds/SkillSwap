import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Divide } from "lucide-react";
import { Button } from "../ui/button";

const LoginForm = ({
  formValues,
}: {
  formValues: { label: string; type: string; placeholder: string }[];
}) => {
  const form = useForm();

  return (
    <Form {...form}>
      {formValues.map((formValue, index) => (
        <FormField
        key={index}
          control={form.control}
          name={formValue.label}
          render={({ field }) => (
            <div className="border rounded my-1 relative px-2 pt-2">
              <span className="text-sm font-medium px-1 absolute -top-3 left-2 bg-white dark:bg-background">
                {formValue.label}
              </span>
              <Input
                className="border-0 focus:border-0 focus:ring-0 outline-none shadow-none focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-0"
                placeholder={formValue.placeholder}
                {...field}
              />
              <FormMessage className="mt-1 text-xs text-red-500" />
            </div>
          )}
        />
      ))}

      <Button variant="default" type="submit" className="w-full mb-3" onClick={form.handleSubmit((data) =>{
        console.log(data);
        
        })}>
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
