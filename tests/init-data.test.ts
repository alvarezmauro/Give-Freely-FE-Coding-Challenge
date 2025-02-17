import { DEFAULT_PARTICIPANTS_DATA, initData } from "@/contents/init-data";
import { StorageKey } from "@/lib/storageKey";

import {
  MOCK_PARTICIPANTS_DATA,
  MOCK_STORED_PARTICIPANTS_DATA
} from "./mocks/dataMocks";

// Mock @plasmohq/storage
const mockStorageGet = jest.fn<
  Promise<undefined | typeof MOCK_PARTICIPANTS_DATA>,
  [StorageKey]
>(() => Promise.resolve(undefined));
const mockStorageSet = jest.fn<
  Promise<void>,
  [StorageKey, typeof DEFAULT_PARTICIPANTS_DATA]
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

// Mock @/services/participantsData
jest.mock("@/services/participantsData", () => {
  return {
    getParticipantsData: jest.fn<Promise<typeof MOCK_PARTICIPANTS_DATA>, []>(
      () => Promise.resolve(MOCK_PARTICIPANTS_DATA)
    )
  };
});

describe("initData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set default participants data in the storage if the storage is empty", async () => {
    await initData();
    // check if we try to get the data from the storage
    expect(mockStorageGet).toHaveBeenCalledWith(StorageKey.ParticipantsData);
    // check if we set the default data in the storage when the storage is empty
    expect(mockStorageSet).toHaveBeenCalledWith(
      StorageKey.ParticipantsData,
      DEFAULT_PARTICIPANTS_DATA
    );
  });

  it("should NOT set default participants data if the storage isn't empty", async () => {
    // override mockStorageGet to return MOCK_STORED_PARTICIPANTS_DATA
    mockStorageGet.mockImplementation(() =>
      Promise.resolve(MOCK_STORED_PARTICIPANTS_DATA)
    );

    await initData();
    // check if we try to get the data from the storage
    expect(mockStorageGet).toHaveBeenCalledWith(StorageKey.ParticipantsData);

    // check if we don't set the default data in the storage when the storage isn't empty
    expect(mockStorageSet).not.toHaveBeenCalledWith(
      StorageKey.ParticipantsData,
      DEFAULT_PARTICIPANTS_DATA
    );
  });

  it("should get participants data and save it in the storage", async () => {
    await initData();
    expect(mockStorageSet).toHaveBeenCalledWith(
      StorageKey.ParticipantsData,
      MOCK_PARTICIPANTS_DATA
    );
  });
});
