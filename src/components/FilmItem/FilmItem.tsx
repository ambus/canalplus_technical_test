import React, { FC } from "react";
import "./FilmItem.css";

export interface FilmItemProps {
  name: string;
  extraDescriptions?: [name: string, value: string][];
}

export const FilmItem: FC<FilmItemProps> = ({ name, extraDescriptions }) => {
  const getExtraDescription = () => {
    return extraDescriptions?.map((description) => (
      <div key={description[0]} className="film-card__extra-description">
        <div className="description__label">{description[0]}:&nbsp;</div>
        <div className="description__value">{description[1]}</div>
      </div>
    ));
  };

  return (
    <div className="film-card">
      <h2>{name}</h2>
      <div className="film-card__body">{getExtraDescription()}</div>
    </div>
  );
};

export default FilmItem;
