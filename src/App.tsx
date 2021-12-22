import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { SearchInput } from "./components/SearchInput";
import { useTVShowsApi } from "./services";
import { FilmItem } from "./components/FilmItem";
import { trimString } from "./utils";

export const OVERVIEW_MAX_LENGTH = 150;

export const App = () => {
  const [tvShows, fetchTvShows] = useTVShowsApi([]);

  const getTvShows = () => {
    if (!tvShows || !tvShows.data || tvShows.data.length <= 0) {
      return <span>Nothing to show</span>;
    }
    return tvShows?.data?.map((tvshow) => {
      const extraDescriptions: [name: string, value: string][] = [];

      extraDescriptions.push([
        "Release date",
        `${tvshow.release_date ?? tvshow.first_air_date}`,
      ]);

      if (tvshow.overview && tvshow.overview?.length > 0) {
        extraDescriptions.push([
          "Summary",
          `${trimString(tvshow.overview, OVERVIEW_MAX_LENGTH)}`,
        ]);
      }

      if (tvshow.origin_country && tvshow.origin_country?.length > 0) {
        extraDescriptions.push(["Country", `${tvshow.origin_country}`]);
      }

      if (tvshow.cast && tvshow.cast?.length > 0) {
        extraDescriptions.push(["Cast", `${tvshow.cast}`]);
      }

      return (
        <FilmItem
          key={tvshow.id}
          name={tvshow.original_title ?? tvshow.name ?? "undefined"}
          extraDescriptions={extraDescriptions}
          img={tvshow.backdrop_path}
        ></FilmItem>
      );
    });
  };

  return (
    <div className="app">
      <header className="app__header">
        <img src={logo} className="header__logo" alt="logo" />
        <p>
          <b>TECHNICAL TEST</b> JavaScript Developer
        </p>
      </header>
      <div className="app__body">
        <div className="body__search">
          <SearchInput
            placeholder="Search"
            id="search"
            name="search"
            onChange={(value) => {
              if (value && value?.length > 0) {
                fetchTvShows(value);
              } else {
                fetchTvShows("");
              }
            }}
          ></SearchInput>
        </div>

        <div className="body__film-list">{getTvShows()}</div>
      </div>
    </div>
  );
};

export default App;
