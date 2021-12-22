import React, { FC } from "react";
import "./FilmItem.css";

export const IMG_BASE_URL = "http://image.tmdb.org/t/p/w300";

export interface FilmItemProps {
  name: string;
  extraDescriptions?: [name: string, value: string][];
  img?: string;
}

export const FilmItem: FC<FilmItemProps> = ({
  name,
  extraDescriptions,
  img,
}) => {
  const getExtraDescription = () => {
    return extraDescriptions?.map((description) => (
      <div key={description[0]} className="film-card__extra-description">
        <div className="description__label">{description[0]}:&nbsp;</div>
        <div className="description__value">{description[1]}</div>
      </div>
    ));
  };

  const getImage = () => {
    if (!img || img.length <= 0) {
      return null;
    }
    return <img src={IMG_BASE_URL + img} alt="Backtrop"></img>;
  };

  return (
    <div className="film-card">
      {getImage()}
      <h2>{name}</h2>
      <div className="film-card__body">{getExtraDescription()}</div>
    </div>
  );
};

export default FilmItem;
