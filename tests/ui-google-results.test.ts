import { addCssClassesToGoogleResults } from "@/contents/ui-google-results";
import { StorageKey } from "@/lib/storageKey";
import {
  MOCK_GOOGLE_RESULTS_WITHOUT_PARTICIPATING_WEBSITE,
  MOCK_GOOGLE_RESULTS_WITH_PARTICIPATING_WEBSITE,
  MOCK_PARTICIPANTS_DATA
} from "@/tests/mocks/dataMocks";

// Mock @plasmohq/storage
const mockStorageGet = jest.fn<
  Promise<undefined | typeof MOCK_PARTICIPANTS_DATA>,
  [StorageKey]
>(() => Promise.resolve(MOCK_PARTICIPANTS_DATA));
const mockStorageSet = jest.fn<
  Promise<void>,
  [StorageKey, typeof MOCK_PARTICIPANTS_DATA]
>();
jest.mock("@plasmohq/storage", () => {
  return {
    Storage: jest.fn().mockImplementation(() => {
      return {
        get: mockStorageGet,
        set: mockStorageSet
      };
    })
  };
});

describe("ui-google-results", () => {
  describe("When Google results page have one or more participating websites", () => {
    it("should highlight the participating result items only by adding the CSS class give-freely-participant", async () => {
      document.body.innerHTML = MOCK_GOOGLE_RESULTS_WITH_PARTICIPATING_WEBSITE;

      await addCssClassesToGoogleResults(MOCK_PARTICIPANTS_DATA);

      const participatingResults = document.querySelectorAll(
        ".give-freely-participant"
      );

      expect(participatingResults.length).toBeGreaterThan(0);
    });
  });

  describe("When Google results page don't have any participating websites", () => {
    it("shouldn't highlight any result item", async () => {
      document.body.innerHTML = MOCK_GOOGLE_RESULTS_WITHOUT_PARTICIPATING_WEBSITE;

      await addCssClassesToGoogleResults(MOCK_PARTICIPANTS_DATA);

      const participatingResults = document.querySelectorAll(
        ".give-freely-participant"
      );

      expect(participatingResults).toHaveLength(0);
    });
  });
});
