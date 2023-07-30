import { fireEvent, render, screen } from "@testing-library/react";

import { MOCK_PARTICIPANTS_DATA } from "./lib/mocks";
import Popup from "./popup";

// Mock @plasmohq/storage/hook
jest.mock("@plasmohq/storage/hook", () => ({
  useStorage: () => [MOCK_PARTICIPANTS_DATA]
}));

// mock import "@/style.css";
jest.mock("@/style.css", () => ({}));

describe("Popup", () => {
  it("renders the list of participating websites", () => {
    render(<Popup />);
    const website1 = screen.getByText(MOCK_PARTICIPANTS_DATA.websites[0].name);
    const website2 = screen.getByText(MOCK_PARTICIPANTS_DATA.websites[2].name);
    expect(website1).toBeInTheDocument();
    expect(website2).toBeInTheDocument();
  });

  it("renders the list of messages when a website is selected", () => {
    render(<Popup />);
    const website1 = screen.getByText(MOCK_PARTICIPANTS_DATA.websites[0].name);
    fireEvent.click(website1);
    const message1 = screen.getByText(
      MOCK_PARTICIPANTS_DATA.websites[0].messages[0]
    );
    const message2 = screen.getByText(
      MOCK_PARTICIPANTS_DATA.websites[0].messages[1]
    );
    expect(message1).toBeInTheDocument();
    expect(message2).toBeInTheDocument();
  });

  it("allows the user to go back to the list of participating websites", () => {
    render(<Popup />);
    const website1 = screen.getByText(MOCK_PARTICIPANTS_DATA.websites[0].name);
    fireEvent.click(website1);
    const goBackButton = screen.getByText("Go Back");
    fireEvent.click(goBackButton);
    const website2 = screen.getByText(MOCK_PARTICIPANTS_DATA.websites[1].name);
    expect(website2).toBeInTheDocument();
  });

  it("does not render the list of messages when no website is selected", () => {
    render(<Popup />);
    const website1 = screen.getByText(MOCK_PARTICIPANTS_DATA.websites[0].name);
    fireEvent.click(website1);
    const goBackButton = screen.getByText("Go Back");
    fireEvent.click(goBackButton);
    const message1 = screen.queryByText(
      MOCK_PARTICIPANTS_DATA.websites[0].messages[0]
    );
    const message2 = screen.queryByText(
      MOCK_PARTICIPANTS_DATA.websites[0].messages[0]
    );
    expect(message1).not.toBeInTheDocument();
    expect(message2).not.toBeInTheDocument();
  });
});
