import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import PaginationComponent from "../../src/components/pagination/PaginationComponent";
import { afterEach } from "node:test";

function LocationTracker() {
  const location = useLocation();
  return <div data-testid="location">{location.search}</div>;
}

function renderWithRouter(
  initialPath = "/?page=1&limit=10",
  disableNext = false
) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PaginationComponent disableNext={disableNext} />
              <LocationTracker />
            </>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("PaginationComponent", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("disables previous button on first page", () => {
    renderWithRouter("/?page=1");

    const prevButton = screen.getAllByRole("button")[0];
    expect(prevButton).toBeDisabled();
  });

  it("clicking next updates the page", () => {
    renderWithRouter("/?page=2");

    const nextButton = screen.getAllByRole("button")[1];
    fireEvent.click(nextButton);

    const locationDiv = screen.getByTestId("location");
    expect(locationDiv.textContent).toContain("page=3");
  });

  it("clicking previous updates the page", () => {
    renderWithRouter("/?page=3");

    const prevButton = screen.getAllByRole("button")[0];
    fireEvent.click(prevButton);

    const locationDiv = screen.getByTestId("location");
    expect(locationDiv.textContent).toContain("page=2");
  });

  it("changing limit updates the limit param", () => {
    renderWithRouter("/?page=1&limit=10");

    fireEvent.change(screen.getByDisplayValue("10"), {
      target: { value: "20" },
    });

    const locationDiv = screen.getByTestId("location");
    expect(locationDiv.textContent).toContain("limit=20");
  });

  it("disableNext prop work as expected", () => {
    renderWithRouter("/?page=1&limit=10", true);

    renderWithRouter("/?page=1");

    const nextButton = screen.getAllByRole("button")[1];
    expect(nextButton).toBeDisabled();
  });
});
