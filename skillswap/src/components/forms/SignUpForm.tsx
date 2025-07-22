import { locations } from "@/data/locations";
import { Button } from "../ui/button";

import { Form, FormField, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { authService } from "@/services/auth.service";

export interface registerData {
  name: string;
  username: string;
  email: string;
  password: string;
  location: string;
}

const SignUpForm = ({
  formValues,
}: {
  formValues: { label: string; type: string; placeholder: string }[];
}) => {
  const form = useForm();

  const handleSignUp = async (data: registerData) => {
   const response = await  authService.signup(data)
   console.log(response);
   
  };

  return (
    <Form {...form}>
      {formValues.map((formValue, index) => (
        <FormField
          key={formValue.label + index}
          control={form.control}
          name={formValue.label.toLowerCase()}
          render={({ field }) => (
            <div className="border rounded my-1 relative px-2 pt-2">
              <span className="text-sm font-medium px-1 absolute -top-3 left-2 bg-white dark:bg-background">
                {formValue.label}
              </span>

              {formValue.label.toLowerCase() === "location" ? (
                <Controller
                  name="location"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      key={formValue.label + index}
                    >
                      <SelectTrigger
                        className="w-full  border-none outline-none ring-0
                      focus:border-0 focus:ring-0 
                      focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-0"
                      >
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent side="bottom" avoidCollisions={false}>
                        <SelectGroup>
                          <SelectLabel>location</SelectLabel>
                          {locations.map((location) => (
                            <SelectItem
                              key={location.name}
                              value={location.name}
                              className="hover:bg-gray-300 rounded-lg"
                            >
                              {location.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              ) : (
                <Input
                  className="border-0 outline-none 
                focus:border-0 focus:ring-0 
                focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-0"
                  placeholder={formValue.placeholder}
                  {...field}
                />
              )}

              <FormMessage className="mt-1 text-xs text-red-500" />
            </div>
          )}
        />
      ))}

      <Button
        onClick={form.handleSubmit((data) =>handleSignUp(data as registerData))}
      >
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUpForm;
