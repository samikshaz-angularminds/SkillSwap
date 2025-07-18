import { useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import ProfileCard from "@/components/ProfileCard";
import { Portal } from "@radix-ui/react-select";

const UserProfile = () => {
  const [linkCopied, setLinkCopied] = useState<boolean>(false);

  return (
    <div className="flex justify-center items-start min-h-screen pt-6 bg-background text-foreground relative">
      <ProfileCard linkCopied={linkCopied} setLinkCopied={setLinkCopied} />
      {linkCopied && (
        <Portal>
          <Alert className="absolute top-3  z-50 w-50 left-1/2 transform -translate-x-1/2">
            <AlertTitle className="flex justify-center">
              Link copied successfully!
            </AlertTitle>
          </Alert>
        </Portal>
      )}
    </div>
  );
};

export default UserProfile;
