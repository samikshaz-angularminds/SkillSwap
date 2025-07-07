import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { envConfig } from "@/config/envConfig";
import LoginForm from "./forms/LoginForm";

const loginFormValues: { label: string; type: string; placeholder: string }[] = [
  { label: "Email", type: "email", placeholder: "Enter your email" },
  { label: "Password", type: "password", placeholder: "Enter your password" },
];

// export const loginFormType = typeof loginFormValues[0].type;

const LoginSignup = () => {

  const handleGoogleSignIn = () => {
    window.location.href = `${envConfig.apiBaseUrl}/auth/google`;
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-white border rounded-sm shadow px-2 py-1">
        Login/SignUp
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">Login/SignUp</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
        
            <LoginForm formValues={loginFormValues} />
          <div className="text-center text-muted-foreground">OR</div>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle size={20} />
            Sign up with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginSignup;
