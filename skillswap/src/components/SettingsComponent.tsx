import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import ShareProfile from "./ShareProfile";

const SettingsComponent = ({
  profileName,
  linkCopied,
  setLinkCopied,
}: {
  profileName: string | undefined;
  linkCopied: boolean;
  setLinkCopied: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [qrCodeValue, setQrCodeValue] = useState("");
  const link = window.location.href;

  useEffect(() => {
    setQrCodeValue(link);
  }, []);

  return (
    <Popover>
      <div className="relative">
        <PopoverTrigger asChild>
          <IoMdSettings />
        </PopoverTrigger>
        <PopoverContent
          side="left"
          align="start"
          className="w-24 p-2 absolute -left-18"
        >
          <div className="flex flex-col">
            <span className="text-sm text-nowrap cursor-pointer">
              <ShareProfile
                profileName={profileName}
                link={link}
                qrCodeValue={qrCodeValue}
                linkCopied={linkCopied}
                setLinkCopied={setLinkCopied}
              />
            </span>
            <span className="text-sm text-nowrap cursor-pointer"></span>
            <span className="text-sm text-nowrap cursor-pointer text-red-600">
              Block
            </span>
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default SettingsComponent;
