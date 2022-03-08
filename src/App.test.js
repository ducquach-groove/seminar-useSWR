import { render, screen } from '@testing-library/react';
import useSWR from 'swr';
import DataFetching from "./DataFetching";

jest.mock("swr", () => jest.fn().mockImplementation(() => jest.fn()));

describe("DataFetching", () => {
  it("Load success", () => {
    useSWR.mockImplementation(() => ({
      data: {
        name: "Duc",
        email: "duc.q@groove.com",
        username: "duc.groove"
      },
      error: undefined
    }))
    render(<DataFetching />);
    expect(screen.getByText("duc.groove")).toBeInTheDocument();
  });

  it("Load Failed", () => {
    useSWR.mockImplementation(() => ({
      data: undefined,
      error: undefined
    }))
    render(<DataFetching />);
    expect(screen.getByText("loading...")).toBeInTheDocument();
  });

  it("Loaded but empty", () => {
    useSWR.mockImplementation(() => ({
      data: {},
      error: undefined
    }))
    render(<DataFetching />);
    expect(screen.getByText("Not existing")).toBeInTheDocument();
  });
});
