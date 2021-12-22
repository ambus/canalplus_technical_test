import { useEffect, useReducer, useState } from "react";
import { TVShow, TVShowCast } from "../models";

const API = "api_key=92b418e837b833be308bbfb1fb2aca1e";
const SEARCH_MULTI_URL = "https://api.themoviedb.org/3/search/multi?";
const GET_TV_CAST_URL = (tvID: number) =>
  `https://api.themoviedb.org/3/tv/${tvID}/credits?${API}`;
const GET_MOVIE_CAST_URL = (movieID: number) =>
  `https://api.themoviedb.org/3/movie/${movieID}/credits?${API}`;

export type Action<TVShow> =
  | { type: "INIT" }
  | { type: "SUCCESS"; payload: TVShow[] }
  | { type: "ERROR" };

export interface State<T> {
  isLoading: boolean;
  isError: boolean;
  data: T;
}

const createDataFetchReducer =
  () =>
  (state: State<TVShow[]>, action: Action<TVShow>): State<TVShow[]> => {
    switch (action.type) {
      case "INIT":
        return {
          ...state,
          isLoading: true,
        };
      case "SUCCESS": {
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      }
      case "ERROR":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error("Action not supported");
    }
  };

export const useTVShowsApi = (initData: TVShow[]) => {
  const [searchValue, setSearchValue] = useState<string>();

  const dataFetchReducer = createDataFetchReducer();

  const [state, setState] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initData,
  });

  useEffect(() => {
    let didCancel = false;
    setState({ type: "INIT" });

    const fetchData = async () => {
      try {
        const results = await fetch(
          `${SEARCH_MULTI_URL}query=${searchValue}&${API}&include_adult=false`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((response) => response?.results as TVShow[]);

        const resultsTVAndMovies: TVShow[] = results.filter(
          (result) =>
            result.media_type === "tv" || result.media_type === "movie"
        );

        try {
          const promisesTVShows: Promise<TVShowCast>[] = resultsTVAndMovies.map(
            (tvSeriesOrMovie) => {
              switch (tvSeriesOrMovie.media_type) {
                case "tv":
                  return fetch(GET_TV_CAST_URL(tvSeriesOrMovie.id), {
                    method: "GET",
                  })
                    .then((response) => response.json())
                    .then((response) => response as TVShowCast);

                case "movie":
                default:
                  return fetch(GET_MOVIE_CAST_URL(tvSeriesOrMovie.id), {
                    method: "GET",
                  })
                    .then((response) => response.json())
                    .then((response) => response as TVShowCast);
              }
            }
          );

          await Promise.all(promisesTVShows).then((response) => {
            resultsTVAndMovies.forEach((tvSeriesOrMovie) => {
              const castAndCrew = response.find(
                (tvShowCast) => tvShowCast.id === tvSeriesOrMovie.id
              );
              tvSeriesOrMovie.cast = castAndCrew?.cast
                .map((castPerson) => castPerson.name)
                ?.join(", ");
            });
          });
        } catch (e) {}

        if (!didCancel) {
          setState({ type: "SUCCESS", payload: resultsTVAndMovies });
        }
      } catch (error) {
        if (!didCancel) {
          setState({ type: "ERROR" });
        }
      }
    };

    if (searchValue && searchValue.length > 0) {
      fetchData();
    } else {
      setState({ type: "SUCCESS", payload: [] as unknown as TVShow[] });
    }

    return () => {
      didCancel = true;
    };
  }, [searchValue]);

  return [state, setSearchValue] as const;
};
