import { render, screen } from "@testing-library/react";

import Banner from "../ui-display-banner";
import { MOCK_PARTICIPANTS_DATA } from "./mocks";

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
    } as Location;

    render(<Banner />);
    const renderedBanner = await screen.queryByTestId("banner");
    expect(renderedBanner).toBeInTheDocument();
  });

  it("should not render the banner when we aren't in a participating website", async () => {
    // mock window.location.host
    delete window.location;
    window.location = {
      host: "www.google.com"
    } as Location;

    render(<Banner />);
    const renderedBanner = await screen.queryByTestId("banner");
    expect(renderedBanner).not.toBeInTheDocument();
  });
});
