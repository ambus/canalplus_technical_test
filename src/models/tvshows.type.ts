export interface TVShow {
  poster_path?: null | string;
  popularity: number;
  id: number;
  overview?: string;
  backdrop_path?: string;
  vote_average?: number;
  media_type: string;
  first_air_date?: string;
  origin_country?: string[];
  genre_ids?: number[];
  original_language?: string;
  vote_count?: number;
  name?: string;
  original_name?: string;
  adult?: boolean;
  release_date?: string;
  original_title?: string;
  title?: string;
  video?: boolean;
  profile_path?: null | string;
  known_for?: TVShow[];
  cast?: string;
}

