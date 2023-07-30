import { StorageKey } from "@/lib/storageKey";
import { getParticipantsData } from "@/services/participantsData";
import type { participantsDataType } from "@/types/participantsData";

import { Storage } from "@plasmohq/storage";

export const DEFAULT_PARTICIPANTS_DATA = {
  websites: [
    {
      name: "TripAdvisor",
      url: "www.tripadvisor.com",
      messages: ["Thank you", "Please shop on our site", "sometihng else"]
    },
    {
      name: "Uber",
      url: "www.uber.com",
      messages: ["Thank you", "Please shop on our site", "sometihng else"]
    }
  ]
};

export const initData = async () => {
  const storage = new Storage();
  const participantsData: participantsDataType | undefined = await storage.get(
    StorageKey.ParticipantsData
  );

  if (!participantsData) {
    await storage.set(StorageKey.ParticipantsData, DEFAULT_PARTICIPANTS_DATA);
  }

  try {
    const participantsData = await getParticipantsData();
    await storage.set(StorageKey.ParticipantsData, participantsData);
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", async () => {
  initData();
});
