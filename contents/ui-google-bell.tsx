import "@/style.css";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { StorageKey } from "@/lib/storageKey";
import { getRandomMessage } from "@/services/participantsData";
import type { participantsDataType } from "@/types/participantsData";
import { Bell } from "lucide-react";
import type { PlasmoCSConfig } from "plasmo";
import { useState } from "react";

import { useStorage } from "@plasmohq/storage/hook";

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"],
  all_frames: true
};

const PlasmoOverlay = () => {
  const [messageData, setMessageData] = useState(null);
  const [participantsData] = useStorage<participantsDataType>(
    StorageKey.ParticipantsData
  );
  
  return (
    <AlertDialog>
      <AlertDialogTrigger
        style={{ position: "fixed", right: "1rem", bottom: "1rem" }}
        onClick={() => {
          setMessageData(getRandomMessage(participantsData));
        }}>
        <Bell className="mr-2 h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Message</AlertDialogTitle>
          <AlertDialogDescription>
            <b>Name:</b> {messageData?.name}
            <br />
            <b>Message:</b> {messageData?.message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PlasmoOverlay;
