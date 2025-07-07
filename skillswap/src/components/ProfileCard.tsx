import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import Reviews from "./Reviews";
import SettingsComponent from "./SettingsComponent";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Link, useParams } from "@tanstack/react-router";
import { type User, DummyUsers } from "@/data/dummy-users";
import { Badge } from "./ui/badge";

const ProfileCard = ({
  linkCopied,
  setLinkCopied,
}: {
  linkCopied: boolean;
  setLinkCopied: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [dummyProfile, setDummyProfile] = useState<User | null>();
  const [requestSent, setRequestSent] = useState(false);

  const { username } = useParams({ from: "/user/$username/" }) as {
    username?: string;
  };

  useEffect(() => {
    setUser();
  }, [username]);

  const setUser = () => {
    // console.log("dummy users: ",DummyUsers);
    // console.log("username: ",username);

    const currentUser = DummyUsers.find((user) => user.username === username);
    // console.log("current user: ",currentUser);;

    setDummyProfile(currentUser || null);
  };

  const sendConnectionRequest = (profileid: string | undefined) => {
    if (profileid === undefined) return;
    console.log("profileid: ", profileid);
    setRequestSent(true);
  };

  

  return (
    <Card className="w-full max-w-3xl shadow-md m-0">
      <CardHeader>
        <div className="flex justify-between  gap-4">
          <div className="flex gap-4 items-center ">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={dummyProfile?.avatarUrl}
                alt={dummyProfile?.name}
              />
              <AvatarFallback>{dummyProfile?.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{dummyProfile?.name}</CardTitle>
              <p className="text-muted-foreground text-sm">
                @{dummyProfile?.username}
              </p>
            </div>
          </div>
          <div>
            <SettingsComponent
              linkCopied={linkCopied}
              setLinkCopied={setLinkCopied}
              profileName={dummyProfile?.name}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-1 items-center">
          <MapPin size={15} className="text-gray-400" />
          <p>{dummyProfile?.location}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium">Bio</h3>
          <p>{dummyProfile?.bio}</p>
        </div>

        <Separator />

        <div className="flex gap-2 items-center">
          <div className="w-1/2">
            <h3 className="text-sm font-medium mb-1 ">Can Offer</h3>
            <div className="flex flex-wrap gap-2">
              {dummyProfile?.skillsOffered.map((skill, i) => (
                <Badge key={i} variant="default" className="p-0">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="w-1/2">
            <h3 className="text-sm font-medium mb-1 ">Wanna Learn</h3>
            <div className="flex flex-wrap gap-2">
              {dummyProfile?.skillsWanted.map((skill, i) => (
                <Badge key={i} variant="secondary" className="p-0">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium">Availability</h3>
          <p>{dummyProfile?.availability}</p>
        </div>

        {dummyProfile?.reviews && dummyProfile.reviews.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Reviews</h3>
            <div className="space-y-2">
              <div className="border rounded-md p-2 bg-muted/20">
                {dummyProfile?.reviews[0]?.author && (
                  <Link
                    to="/user/$username"
                    params={{ username: dummyProfile.reviews[0].author }}
                    className="text-sm font-medium hover:underline cursor-pointer"
                  >
                    @{dummyProfile.reviews[0].author}
                  </Link>
                )}
                <p className="text-sm">{dummyProfile?.reviews[0]?.content}</p>
              </div>

              {dummyProfile?.reviews && dummyProfile?.reviews.length > 1 && (
                <Reviews reviews={dummyProfile?.reviews} />
              )}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium">Points</h3>
          <p className="text-lg font-semibold">{dummyProfile?.points}</p>
        </div>

        <div className="pt-4 flex justify-center">
          {/* onClick={() => router.navigate({to: "/user/messages"})} */}
          <button
            className= {`${requestSent ? "bg-white border-black shadow" : "bg-blue-400 hover:bg-primary/90 transition " }   px-4 py-2 rounded-lg `}
            onClick={() => sendConnectionRequest(dummyProfile?.uid)}
          >
            {requestSent ? "Request Sent!" : "Connect"} 
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
