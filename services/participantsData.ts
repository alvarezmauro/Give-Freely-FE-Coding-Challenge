import { getRandomElementFomArray } from "@/lib/utils";

import type { participantsDataType } from "../types/participantsData";

const API_URL = "https://api.jsonbin.io/v3/b/64bab76fb89b1e2299c20ffa";
const API_TOKEN =
  "$2b$10$QhrtefF/jKDbKgauF5trL.SK6VAk69VSIcHMhGaEs8ZViK.xBh0Om";

type participantsRequestResponse = {
  record: participantsDataType;
  metadata: {
    id: string;
    private: boolean;
    name: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    type: string;
    collectionId: string;
  };
};

export function getParticipantsData(): Promise<participantsDataType> {
  return fetch(API_URL, {
    method: "GET",
    headers: {
      "X-Access-Key": API_TOKEN,
      "Content-Type": "application/json"
    }
  })
    .then(async (resp) => {
      try {
        const rawData = (await resp.json()) as participantsRequestResponse;
        return rawData.record;
      } catch (error) {
        console.log(error);
        return error;
      }
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
}

export function getUrlsFromParticipantsData(
  participantsData: participantsDataType
): string[] {
  if (!participantsData) return [];
  const { websites } = participantsData;
  const urls = websites.map((participant) => participant.url);
  return urls;
}

export function getRandomMessage({ websites }: participantsDataType): {
  name: string;
  message: string;
} {
  const randomParticipant = getRandomElementFomArray(websites);
  const randomMessages = getRandomElementFomArray(randomParticipant?.messages);

  return {
    name: randomParticipant.name,
    message: randomMessages
  };
}
