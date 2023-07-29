import { participantsDataType } from "@/types/participantsData";

import {
  getParticipantsData,
  getRandomMessage,
  getUrlsFromParticipantsData
} from "./participantsData";

// This is just dummy data - change its shape in a format that your API renders.
const MOCK_DATA = {
  record: {
    websites: [
      {
        name: "TripAdvisor",
        url: "www.tripadvisor.com",
        messages: ["Message 1", "Message 2", "Message 3", "Message 4"]
      },
      {
        name: "Uber",
        url: "www.uber.com",
        messages: ["Message 1", "Message 2", "Message 3", "Message 4"]
      }
    ]
  }
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA)
  })
) as jest.Mock;

describe("getParticipantsData", () => {
  it("should return a Promise that resolves to participants data", async () => {
    const participantsData = await getParticipantsData();
    expect(participantsData).toBeDefined();
    expect(participantsData.websites.length).toBeGreaterThan(0);
  });
});

describe("getUrlsFromParticipantsData", () => {
  it("should return an empty array if participantsData is undefined", () => {
    const urls = getUrlsFromParticipantsData(undefined);
    expect(urls).toEqual([]);
  });

  it("should return an array of website URLs from participantsData", () => {
    const participantsData: participantsDataType = MOCK_DATA.record;
    const urls = getUrlsFromParticipantsData(participantsData);
    expect(urls).toEqual(["www.tripadvisor.com", "www.uber.com"]);
  });
});

describe("getRandomMessage", () => {
  it("should return an object with name and message properties", () => {
    const participantsData: participantsDataType = MOCK_DATA.record;
    const message = getRandomMessage(participantsData);
    expect(message).toHaveProperty("name");
    expect(message).toHaveProperty("message");
  });

  it("should return a random message from a random participant", () => {
    const participantsData: participantsDataType = MOCK_DATA.record;
    const message = getRandomMessage(participantsData);
    expect(message.message).toMatch(/Message [1-4]/);
  });
});
