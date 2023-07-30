import { render, screen } from "@testing-library/react";

import Banner from "./ui-display-banner";

// Data we expect to be returned from getParticipantsData
export const MOCK_PARTICIPANTS_DATA = {
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

// Mock @plasmohq/storage/hook
jest.mock("@plasmohq/storage/hook", () => ({
  useStorage: () => [MOCK_PARTICIPANTS_DATA]
}));

describe("ui-display-banner", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the banner when we are in a participating website", async () => {
    // mock window.location.host
    delete window.location;
    window.location = {
      host: "www.tripadvisor.com"
    } as any;

    render(<Banner />);
    const renderedBanner = await screen.queryByTestId("banner");
    expect(renderedBanner).toBeInTheDocument();
  });

  it("should not render the banner when we aren't in a participating website", async () => {
    // mock window.location.host
    delete window.location;
    window.location = {
      host: "www.google.com"
    } as any;

    render(<Banner />);
    const renderedBanner = await screen.queryByTestId("banner");
    expect(renderedBanner).not.toBeInTheDocument();
  });
});
