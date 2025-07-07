import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const myProfile = {
  _id: "507f1f77bcf86cd799439011", // Unique identifier
  name: "Jane Doe",
  username: "janedoe",
  email: "jane@example.com", // Hidden in UI
  avatarUrl: "https://i.pravatar.cc/150?img=45",
  bio: "Frontend developer with a love for clean UI and accessibility.",
  location: "San Francisco, CA",
  skillsOffered: ["React", "TypeScript", "Tailwind", "UI/UX"],
  skillsWanted: ["Node.js", "GraphQL"],
  availability: "Weekdays 6pm - 9pm",
  reviews: [
    {
      author: "johnsmith",
      content: "Jane is super helpful and great at explaining things!",
    },
    {
      author: "devgal",
      content: "Loved working with her. Clear and professional.",
    },
  ], // Hidden or summarized in UI
  points: 420, // Hidden in UI
};
const MyProfile = ({ title = "Profile" }: { title: string }) => {
  const [dummyProfile, setDummyProfile] = useState(myProfile);

  return (
    <>
      <Helmet>
        <title>{title} | SkillSwap</title>
        
      </Helmet>

      <div className="flex justify-center items-start min-h-screen p-6 bg-background text-foreground">
        <Card className="w-full max-w-3xl shadow-md">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={dummyProfile.avatarUrl}
                  alt={dummyProfile.name}
                />
                <AvatarFallback>{dummyProfile.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{dummyProfile.name}</CardTitle>
                <p className="text-muted-foreground text-sm">
                  @{dummyProfile.username}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Email</h3>
              <p>{dummyProfile.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium">Location</h3>
              <p>{dummyProfile.location}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium">Bio</h3>
              <p>{dummyProfile.bio}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-1">Skills Offered</h3>
              <div className="flex flex-wrap gap-2">
                {dummyProfile.skillsOffered.map((skill, i) => (
                  <Badge key={i} variant="default">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-1">Skills Wanted</h3>
              <div className="flex flex-wrap gap-2">
                {dummyProfile.skillsWanted.map((skill, i) => (
                  <Badge key={i} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium">Availability</h3>
              <p>{dummyProfile.availability}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Reviews</h3>
              <div className="space-y-2">
                {dummyProfile.reviews.map((review, i) => (
                  <div key={i} className="border rounded-md p-2 bg-muted/20">
                    <p className="text-sm font-medium">@{review.author}</p>
                    <p className="text-sm">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium">Points</h3>
              <p className="text-lg font-semibold">{dummyProfile.points}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default MyProfile;
