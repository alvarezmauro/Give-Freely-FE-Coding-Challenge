import { StorageKey } from "@/lib/storageKey";
import { getRandomElementFomArray } from "@/lib/utils";
import type { participantsDataType } from "@/types/participantsData";
import type { PlasmoCSConfig } from "plasmo";
import { useEffect, useState } from "react";

import { useStorage } from "@plasmohq/storage/hook";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
};

const PlasmoOverlay = () => {
  const [message, setMessage] = useState(null);
  const [participantsData] = useStorage<participantsDataType>(
    StorageKey.ParticipantsData
  );

  useEffect(() => {
    const messageData = participantsData?.websites.find(
      (website) => website.url === window.location.host
    );

    if (messageData) {
      setMessage(getRandomElementFomArray(messageData.messages));
    }
  }, [participantsData]);

  return message ? (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.8)",
        width: "100%",
        position: "fixed"
      }}>
      <p style={{ textAlign: "center" }}>{message}</p>
    </div>
  ) : null;
};

export default PlasmoOverlay;
