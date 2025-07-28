import {
  HomeIcon,
  Image,
  LogOutIcon,
  PaintBucketIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

import LoginSignup from "./LoginSignup";
import { isAuthenticated, removeAccessToken } from "@/services/token.service";

const CustomHeader = () => {

  const isLoggedIn = isAuthenticated();

  const handleLogout = () => {
    removeAccessToken();
  }
  
  return (
    <header className="w-full sticky z-100 top-0 bg-gray-300 h-12 p-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Link to="/user/myProfile">
            <Image />
          </Link>

          <Link to="/user/home">
            <HomeIcon className="h-6 w-6 cursor-pointer" />
          </Link>

          <Link to="/user/skilldevelop">
            <PaintBucketIcon />
          </Link>
        </div>
        <div className="flex gap-2">
          {
            isLoggedIn ? <LogOutIcon onClick={handleLogout} className="cursor-pointer" /> : <LoginSignup />
          }
        </div>
      </div>
    </header>
  );
};

export default CustomHeader;
