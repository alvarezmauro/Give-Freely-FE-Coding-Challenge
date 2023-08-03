import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { StorageKey } from "@/lib/storageKey";
import { getRandomElementFomArray } from "@/lib/utils";
import type { participantsDataType } from "@/types/participantsData";
import type { PlasmoCSConfig } from "plasmo";
import { useEffect, useState } from "react";

import "@/style.css";

import { useStorage } from "@plasmohq/storage/hook";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
};

const PlasmoOverlay = () => {
  const [message, setMessage] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState(null);
  const [redirectMessage, setRedirectMessage] = useState(null);
  const [participantsData] = useStorage<participantsDataType>(
    StorageKey.ParticipantsData
  );

  useEffect(() => {
    const participantData = participantsData?.websites.find(
      (website) => website.url === window.location.host
    );

    if (participantData) {
      if (participantData.messages) {
        setMessage(getRandomElementFomArray(participantData.messages));
      }
      if (participantData.redirect) {
        setRedirectUrl(participantData.redirect.url);
        setRedirectMessage(participantData.redirect.message);
      }
    }
  }, [participantsData]);

  return message ? (
    <>
      <div
        data-testid="banner"
        style={{
          backgroundColor: "rgba(255,255,255,0.8)",
          width: "100%",
          position: "fixed"
        }}>
        <p style={{ textAlign: "center" }}>{message}</p>
        {redirectUrl && redirectMessage ? (
          <AlertDialog defaultOpen>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Redirect data</AlertDialogTitle>
                <AlertDialogDescription>
                  <a href={redirectUrl} target="_blank">
                    {redirectMessage}
                  </a>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Close</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null}
      </div>
    </>
  ) : null;
};

export default PlasmoOverlay;
