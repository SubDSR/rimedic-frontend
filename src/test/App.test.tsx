import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App", () => {
  it("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container.querySelector("#root, header")).toBeTruthy();
  });

  it("renders the WhatsApp floating button", () => {
    const { getByLabelText } = render(<App />);
    expect(getByLabelText("Agenda tu cita por WhatsApp")).toBeInTheDocument();
  });
});
