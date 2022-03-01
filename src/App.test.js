import { render, screen } from '@testing-library/react';
import useSWR from 'swr';
import DataFetching from "./DataFetching";

jest.mock("swr", () => jest.fn().mockImplementation(() => jest.fn()));

describe("DataFetching", () => {
  it("Load success", () => {
    useSWR.mockImplementation(() => ({
      data: {
        email: "arroyocolton@gmail.com",
        username: "Duc"
      },
      error: undefined
    }))
    render(<DataFetching />);
    expect(screen.getByText("arroyocolton@gmail.com")).toBeInTheDocument();
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
