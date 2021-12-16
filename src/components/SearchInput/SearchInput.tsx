import React, { FC } from "react";
import "./SearchInput.css";

interface SearchInputProps {
  placeholder: string;
  id: string;
  name: string;
}
export const SearchInput: FC<SearchInputProps> = ({
  placeholder,
  id,
  name,
}) => {
  return (
    <div className="search-input">
      <input
        type="input"
        className="search-input__field"
        placeholder={placeholder}
        name={name}
        id={name}
      />
      <label htmlFor="name" className="search-input__label">
        {placeholder}
      </label>
    </div>
  );
};
