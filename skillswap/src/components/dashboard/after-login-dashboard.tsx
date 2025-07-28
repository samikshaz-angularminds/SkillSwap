import { DummyUsers } from "@/data/dummy-users";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import  { Button } from "../ui/button";
import  { Card, CardContent } from "../ui/card";
import { Link } from "@tanstack/react-router";
import { userService } from "@/services/user.service";
import type { ApiResponse } from "@/services/api.service";

export interface Avatar {
  public_id: string;
  url: string;
  _id: string;
}

export interface User {
  uid: string;
  username: string;
  email: string;
  bio: string;
  avatar: Avatar;
  availability: any[]; // Replace `any` with a more specific type if you have one
  matches: any[];
  messages: any[];
  reviews: any[];
  skillsOffered: any[];
  skillsWanted: any[];
  createdAt: string; // or `Date` if you're converting to Date objects
  updatedAt: string;
}

const AfterLoginDashboard = () => {
  const [availableUsers,setAvailableUsers] = useState<User[] | null>(null);
    // State to track dismissed user IDs
  const [dismissedUsers, setDismissedUsers] = useState<string[]>([]);

  useEffect(() => {
    fetchAvailableUsers();
  },[])

  const fetchAvailableUsers = async () => {
    const response = await userService.getAllUsers() as ApiResponse;
setAvailableUsers(response.data)
    console.log("available users: ",response.data);
    
  }

  // Function to handle dismissing a user
  const handleDismiss = (username: string) => {
    setDismissedUsers((prev) => [...prev, username]);

    // Automatically restore the user after 10 seconds
    setTimeout(() => {
      setDismissedUsers((prev) => prev.filter((id) => id !== username));
    }, 10000); // 10 seconds
  };

  // Filter out dismissed users from the displayed list
  const visibleUsers = DummyUsers.filter(
    (user) => !dismissedUsers.includes(user.username)
  );

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {availableUsers && availableUsers.map((user: User) => (
          <Card
            key={user.username}
            className="rounded-2xl shadow-md hover:shadow-lg transition-all relative"
          >
            <CardContent className="flex flex-col items-center text-center p-4">
              <Avatar className="w-20 h-20 mb-4">
                {
                  user.avatar && user.avatar.url ? (

                    <AvatarImage src={user.avatar.url} alt={user.avatar.url} />
                  ) : (
                    <AvatarImage src="../../../public/images/profile-image.png" alt="default image" />
                  )
                }
              </Avatar>
              <Link
                to="/user/$username"
                params={{ username: user.username }}
                className="text-lg font-semibold mb-1 hover:underline hover:cursor-pointer "
              >
                {user.username}
              </Link>
              <p className="text-muted-foreground text-sm mb-2">
                @{user.username}
              </p>
              <div className="flex flex-wrap justify-center gap-1">
                {user.skillsOffered
                  .slice(0, 3)
                  .map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-muted text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </CardContent>
            {/* Cancel Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              onClick={() => handleDismiss(user.username)}
              aria-label={`Dismiss ${user.username}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </Card>
        ))}
      </div>
    )
}

export default AfterLoginDashboard