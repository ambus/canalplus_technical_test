/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import FilmItem, { FilmItemProps } from "./FilmItem";

describe("trimString", () => {
  let mockFilmData: FilmItemProps;

  beforeEach(() => {
    mockFilmData = {
      name: "Test film name",
      extraDescriptions: [
        ["cast", "John Kowalski"],
        ["release date", "2013-12-11"],
      ],
    };
  });

  it("should render FilmItem with name on the header", () => {
    render(<FilmItem name={mockFilmData.name} />);
    const nameElement = screen.getByText(/Test film name/i);
    expect(nameElement).toBeInTheDocument();
  });

  it("should render the FilmItem without any description element if extraDescriptions param is empty", () => {
    render(<FilmItem name={mockFilmData.name} />);
    const extraDescriptionWrapper = screen.queryAllByText(
      /film-card__extra-description/i
    );
    expect(extraDescriptionWrapper).toEqual([]);
  });

  it("should render the FilmItem with the same number of extraDescriptions fileds as specified in the parameter", () => {
    const { container } = render(
      <FilmItem
        name={mockFilmData.name}
        extraDescriptions={mockFilmData.extraDescriptions}
      />
    );

    const extraDescriptionWrapper = container.querySelectorAll(
      ".film-card__extra-description"
    );
    expect(extraDescriptionWrapper.length).toBe(
      mockFilmData?.extraDescriptions?.length
    );
  });
});
