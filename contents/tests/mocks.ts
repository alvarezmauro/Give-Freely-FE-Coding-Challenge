import type { participantsDataType } from "@/types/participantsData";

// Data we expect to be stored in storage
export const MOCK_STORED_PARTICIPANTS_DATA: participantsDataType = {
  websites: [
    {
      name: "TripAdvisor",
      url: "www.tripadvisor.com",
      messages: ["Message 1", "Message 2", "Message 3", "Message 4"]
    }
  ]
};

// Data we expect to be returned from getParticipantsData
export const MOCK_PARTICIPANTS_DATA: participantsDataType = {
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
    },
    {
      name: "Amazon",
      url: "www.amazon.com",
      messages: ["Message 1", "Message 2", "Message 3", "Message 4"]
    }
  ]
};
