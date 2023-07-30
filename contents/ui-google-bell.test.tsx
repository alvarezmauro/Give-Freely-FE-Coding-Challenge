import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import GoogleBell from "./ui-google-bell";

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

// mock import "@/style.css";
jest.mock("@/style.css", () => ({}));

describe("ui-google-bell", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Snapshot test of bell button", async () => {
    render(<GoogleBell />);
    const renderedGoogleBellButton = await screen.queryByTestId(
      "google-bell-button"
    );
    expect(renderedGoogleBellButton).toMatchSnapshot();
  });

  it("Snapshot test of bell button", async () => {
    render(<GoogleBell />);
    const renderedGoogleBellButton = await screen.queryByTestId(
      "google-bell-button"
    );
    // Click on the bell button
    await act(async () => {
        // Click on the bell button
        await renderedGoogleBellButton.click();
      });
    // Check if the dialog is rendered
    const renderedGoogleBellDialog = await screen.queryByTestId(
        "google-bell-dialog"
    );
    expect(renderedGoogleBellDialog).toBeInTheDocument();
  });
});
