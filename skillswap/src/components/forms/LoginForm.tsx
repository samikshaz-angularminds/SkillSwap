import { useForm } from "react-hook-form";
import { Form, FormField, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { authService } from "@/services/auth.service";
import type { ApiResponse } from "@/services/api.service";
import { setAccessToken } from "@/services/token.service";

export interface loginData {
    email: string,
    password:string
}

const LoginForm = ({
  formValues,
  setHasLoggedIn
}: {
  formValues: { label: string; type: string; placeholder: string }[];
  setHasLoggedIn: (value:boolean) => void
}) => {
  const form = useForm();

  const handleLogin = async (data:loginData) => {
    // Define the expected response type
    const response = await authService.login(data) as ApiResponse;

    console.log(response);
    
    if(response.success){
      setAccessToken(response.data.accessToken)
      setHasLoggedIn(true)
    }
    
  }

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {formValues.map((formValue, index) => (
            <FormField
              key={index}
              control={form.control}
              name={formValue.label.toLowerCase()}
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
        </div>
        <Button
          variant="default"
          type="submit"
          className="w-full mb-3"
          onClick={form.handleSubmit((data) => handleLogin(data as loginData))}
        >
          Login
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
