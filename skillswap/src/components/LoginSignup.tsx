import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from "./ui/dialog";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { RxCross2 } from "react-icons/rx"; // Cross icon
import { envConfig } from "@/config/envConfig";
import LoginForm from "./forms/LoginForm";
import { useState } from "react";
import SignUpForm from "./forms/SignUpForm";

const loginFormValues: { label: string; type: string; placeholder: string }[] =
  [
    { label: "Email", type: "email", placeholder: "Enter your email" },
    { label: "Password", type: "password", placeholder: "Enter your password" },
  ];

const signupFormValues: { label: string; type: string; placeholder: string }[] =
  [
    { label: "name", type: "text", placeholder: "Enter your name" },
    { label: "username", type: "text", placeholder: "Enter your username" },
    // { label: "bio", type: "email", placeholder: "Enter your bio" },
    { label: "location", type: "text", placeholder: "Enter your location" },
    { label: "Email", type: "email", placeholder: "Enter your email" },
    { label: "Password", type: "password", placeholder: "Enter your password" },
  ];

// export const loginFormType = typeof loginFormValues[0].type;

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleGoogleSignIn = () => {
    window.location.href = `${envConfig.apiBaseUrl}/auth/google`;
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-white border rounded-sm shadow px-2 py-1">
        Login/Signup
      </DialogTrigger>
      <DialogContent className="[&>button:not([data-slot='dialog-close'])]:hidden">
        <DialogClose className="fixed top-[-15px] right-[-15px] hover:cursor-pointer p-2 rounded-full border-2 border-gray-400 text-black  transition bg-muted">
          <RxCross2 className="h-5 w-5" />
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            <span
              className="hover:underline cursor-pointer"
              onClick={() => setIsLogin(true)}
            >
              Login
            </span>
            /
            <span
              className="hover:underline cursor-pointer"
              onClick={() => setIsLogin(false)}
            >
              SignUp
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {isLogin ? (
            <div>
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
          ) : (
            <SignUpForm formValues={signupFormValues} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginSignup;
