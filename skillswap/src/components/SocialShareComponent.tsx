import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiShare2 } from "react-icons/fi";
import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { FaXTwitter } from "react-icons/fa6";

const SocialShareComponent = ({ link }: { link: string }) => {
  const [open, setOpen] = useState(false);

  const shareProfile = (platform: string) => {
    console.log({ link, platform });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center justify-center">
          <Button className="rounded-full  border-2 border-muted-foreground !p-2 cursor-pointer">
            <FiShare2 />
          </Button>
          <span>Share Profile</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex gap-2">
          <TwitterShareButton
            url={link}
            onClick={() => console.log("shared to twitter")}
          >
            <FaXTwitter size={32} className="rounded-full" />
            {/* <TwitterIcon size={32} round={true} /> */}
          </TwitterShareButton>

          <WhatsappShareButton url={link} >
            <WhatsappIcon size={32} className="rounded-full" />
          </WhatsappShareButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShareComponent;
