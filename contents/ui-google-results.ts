import { StorageKey } from "@/lib/storageKey";
import { getUrlsFromParticipantsData } from "@/services/participantsData";
import type { participantsDataType } from "@/types/participantsData";
import styleText from "data-text:./ui-google-results-styles.css";
import type { PlasmoCSConfig } from "plasmo";

import { Storage } from "@plasmohq/storage";

const GOOGLE_RESULTS_SELECTOR = ".MjjYud";
const GIVE_FREELY_PARTICIPANT_CLASS = "give-freely-participant";

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"],
  all_frames: true
};

/**
 * Add css class "give-freely-participant" to all search results
 * participating in our extension
 */
export async function addCssClassesToGoogleResults(participantsData: participantsDataType) {
  const urls = getUrlsFromParticipantsData(participantsData);
  // console.log(urls);
  const participatingLink = document.querySelectorAll(
    urls.map((url) => `a[href*="${url}"]`).join(", ")
  );

  participatingLink.forEach((participatingLink) => {
    const closestGoogleResult = participatingLink.closest(
      GOOGLE_RESULTS_SELECTOR
    );
    if (closestGoogleResult) {
      closestGoogleResult.classList.add(GIVE_FREELY_PARTICIPANT_CLASS);
    }
  });
}

window.addEventListener("load", async () => {
  // Add CSS to pages where the domain is "https://www.google.com/"
  // The main purpose of this CSS is to add a border around the search
  // results (to indicate these results are participating in our extension)
  const style = document.createElement("style");
  style.innerHTML = styleText;
  document.head.appendChild(style);

  const storage = new Storage();
  const participantsData: participantsDataType = await storage.get(
    StorageKey.ParticipantsData
  );

  addCssClassesToGoogleResults(participantsData);

  storage.watch({
    [StorageKey.ParticipantsData]: async (change) => {
      if (change.newValue) {
        const participantsData: participantsDataType = await storage.get(
          StorageKey.ParticipantsData
        );
        addCssClassesToGoogleResults(participantsData);
      }
    }
  });
});
