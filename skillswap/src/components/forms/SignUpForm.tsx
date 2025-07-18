import { locations } from "@/data/locations";
import { Button } from "../ui/button";

import { Form, FormField, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SignUpForm = ({
  formValues,
}: {
  formValues: { label: string; type: string; placeholder: string }[];
}) => {
  const form = useForm();

  return (
    <Form {...form}>
      {formValues.map((formValue, index) => (
        <FormField
          key={formValue.label + index}
          render={(field) => (
            <div className="border rounded my-1 relative px-2 pt-2">
              <span className="text-sm font-medium px-1 absolute -top-3 left-2 bg-white dark:bg-background">{formValue.label}</span>
              {formValue.label === "location" ? (
                  <Select  key={formValue.label+index}>
                    <SelectTrigger className="w-full  border-none outline-none ring-0
                      focus:border-0 focus:ring-0 
                      focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-0" >
                      <SelectValue  placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent side="bottom" avoidCollisions={false} >
                      <SelectGroup>
                        <SelectLabel>location</SelectLabel>
                        {locations.map((location) => (
                          <SelectItem value={location.name}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
              ) : (
                <Input className="border-0 outline-none focus:border-0 focus:ring-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-0" placeholder={formValue.placeholder} {...field} />
              )}

              <FormMessage />
            </div>
          )}
          name={formValue.label}
        />
      ))}

      <Button>Sign Up</Button>
    </Form>
  );
};

export default SignUpForm;
