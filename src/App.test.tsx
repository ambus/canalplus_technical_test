import { render, screen } from "@testing-library/react";
import App from "./App";
import { TVShow } from "./models";
import * as useTVShowsApi from "./services/tvshows.service";

describe("App", () => {
  const mockTVShows: TVShow[] = [
    {
      popularity: 0,
      id: 1,
      media_type: "tv",
      original_title: "Test tvShow",
      overview:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at est dictum, viverra magna nec, luctus nibh. Integer ut volutpat metus. Nulla tincidunt pretium quam eget laoreet. Donec feugiat in nisi.",
    },
  ];

  const mockState: useTVShowsApi.State<TVShow[]> = {
    isLoading: false,
    isError: false,
    data: mockTVShows,
  };

  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display header with image and label", () => {
    render(<App />);
    const headerElement = screen.getByText(/TECHNICAL TEST/i);
    const imgElement = screen.getByRole("img");

    expect(headerElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });

  it("should display search input", async () => {
    render(<App />);
    const inputElement = await screen.findByRole("textbox");

    expect(inputElement).toBeInTheDocument();
  });

  it("should display text 'Nothing to show' if tvshow list is empty", () => {
    render(<App />);
    const headerElement = screen.getByText(/Nothing to show/i);

    expect(headerElement).toBeInTheDocument();
  });

  it("should display tvshows list if tvShows are not empty", () => {
    jest
      .spyOn(useTVShowsApi, "useTVShowsApi")
      .mockReturnValue([mockState, jest.fn()]);

    render(<App />);
    const firstTvShow = screen.getByText(
      mockTVShows[0].original_title ?? "INVALID_TEXT"
    );
    expect(firstTvShow).toBeInTheDocument();
  });
});
