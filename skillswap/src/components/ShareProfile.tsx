import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { FiShare2 } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { useRef } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Alert, AlertTitle } from "./ui/alert";
import SocialShareComponent from "./SocialShareComponent";

const ShareProfile = ({
  link,
  qrCodeValue,
  profileName,
  linkCopied,
  setLinkCopied,
}: {
  link: string;
  qrCodeValue: string;
  profileName: string | undefined;
  linkCopied: boolean;
  setLinkCopied: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  const copyLink = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log(link);

        setLinkCopied(true);
      })
      .catch((err) => console.log(err));
  };

  const handleShare = () => {};

  return (
    <Dialog 
    onOpenChange={(isOpen) => {
      if(!isOpen) setLinkCopied(false)
    }}
    >
      <form>
        <DialogTrigger asChild>
          <span>Share</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] flex flex-col items-center [&>button]:hidden">
          <DialogTitle></DialogTitle>
          <div className="flex flex-col items-center justify-center">
            <QRCodeSVG
              className="rounded-2xl"
              bgColor="white"
              fgColor="#ea794f"
              size={220}
              value={qrCodeValue}
            />
            <span>@{profileName}</span>
          </div>
          <div className="flex gap-4">
            <SocialShareComponent link={link}/>

            <div className="flex flex-col items-center justify-center">
              <Button
                className="rounded-full  border-2 border-muted-foreground !p-2 cursor-pointer"
                onClick={() => copyLink()}
              >
                <IoIosLink />
              </Button>
              <span>Copy Link</span>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ShareProfile;
