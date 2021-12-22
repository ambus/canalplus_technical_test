import React, { FC, useState } from "react";
import { useDebounce } from "../../utils";
import "./SearchInput.css";

export interface SearchInputProps {
  placeholder: string;
  id: string;
  name: string;
  onChange: (value?: string) => void;
  debouceTimeMiliseconds?: number;
}

export const SearchInput: FC<SearchInputProps> = ({
  placeholder,
  id,
  name,
  onChange,
  debouceTimeMiliseconds = 600,
}) => {
  const [value, setValue] = useState<string>();

  useDebounce(() => onChange(value), [value], debouceTimeMiliseconds);

  return (
    <div className="search-input">
      <input
        type="input"
        className="search-input__field"
        placeholder={placeholder}
        name={name}
        id={id}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <label htmlFor="name" className="search-input__label">
        {placeholder}
      </label>
    </div>
  );
};

export default SearchInput;
