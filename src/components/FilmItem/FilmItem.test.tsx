/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import FilmItem, { FilmItemProps, IMG_BASE_URL } from "./FilmItem";

describe("filmItem", () => {
  let mockFilmData: FilmItemProps;

  beforeEach(() => {
    mockFilmData = {
      name: "Test film name",
      extraDescriptions: [
        ["cast", "John Kowalski"],
        ["release date", "2013-12-11"],
      ],
      img: "/extraImage.jpg",
    };
  });

  it("should render FilmItem with name on the header", () => {
    render(<FilmItem name={mockFilmData.name} />);
    const nameElement = screen.getByText(/Test film name/i);
    expect(nameElement).toBeInTheDocument();
  });

  it("should render the FilmItem with the correct url, consisting of a fixed part and a given file name", () => {
    render(<FilmItem name={mockFilmData.name} img={mockFilmData.img} />);
    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.getAttribute("src")).toBe(
      IMG_BASE_URL + mockFilmData.img
    );
  });

  it("should render the FilmItem without image if a given img parameter is empty", () => {
    render(<FilmItem name={mockFilmData.name} img={""} />);
    const imgElement = screen.queryByRole("img");
    expect(imgElement).toBeNull();
  });

  it("should render the FilmItem without image if a given img parameter is undefinded", () => {
    render(<FilmItem name={mockFilmData.name} />);
    const imgElement = screen.queryByRole("img");
    expect(imgElement).toBeNull();
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

  // it("should render the FilmItem with the same number of extraDescriptions fileds", () => {
  //   const { container } = render(
  //     <FilmItem
  //       name={mockFilmData.name}
  //       extraDescriptions={mockFilmData.extraDescriptions}
  //     />
  //   );

  //   const extraDescriptionWrapper = container.querySelectorAll(
  //     ".film-card__extra-description"
  //   );

  //   extraDescriptionWrapper.forEach((element) => {
  //     console.warn(element)
  //     expect(
  //       (element.childNodes[0] as HTMLDivElement).innerText.toLocaleLowerCase()
  //     ).toContain(mockFilmData?.extraDescriptions?.[0][0].toLocaleLowerCase());
  //   });
  // });
});
