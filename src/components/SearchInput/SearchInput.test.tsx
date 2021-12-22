import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput, { SearchInputProps } from "./SearchInput";

describe("SearchInput", () => {
  let mockSearchInput: SearchInputProps;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockSearchInput = {
      placeholder: "Search",
      id: "search",
      name: "search",
      onChange: () => {},
      debouceTimeMiliseconds: 600,
    };
  });

  it("should render SearchInput with input", async () => {
    render(
      <SearchInput
        placeholder={mockSearchInput.placeholder}
        id={mockSearchInput.id}
        name={mockSearchInput.name}
        onChange={mockSearchInput.onChange}
      ></SearchInput>
    );
    const inputElement = await screen.findByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("should call onChange event when input value has change", async () => {
    const onSearchMock = jest.fn();

    render(
      <SearchInput
        placeholder={mockSearchInput.placeholder}
        id={mockSearchInput.id}
        name={mockSearchInput.name}
        onChange={onSearchMock}
      ></SearchInput>
    );

    const inputElement = await screen.findByRole<HTMLInputElement>("textbox");
    fireEvent.change(inputElement, { target: { value: "newSearchValue" } });

    jest.runAllTimers();

    expect(onSearchMock).toBeCalledTimes(1);
  });

  it("should call onChange event when input value has change and propagate input value", async () => {
    const onSearchMock = jest.fn();

    render(
      <SearchInput
        placeholder={mockSearchInput.placeholder}
        id={mockSearchInput.id}
        name={mockSearchInput.name}
        onChange={onSearchMock}
      ></SearchInput>
    );

    const inputElement = await screen.findByRole<HTMLInputElement>("textbox");
    fireEvent.change(inputElement, { target: { value: "newSearchValue" } });

    jest.runAllTimers();
    expect(onSearchMock).toBeCalledWith("newSearchValue");
  });

  it("should call onChange event when user stops writing", async () => {
    jest.useRealTimers();
    const onSearchMock = jest.fn();

    render(
      <SearchInput
        placeholder={mockSearchInput.placeholder}
        id={mockSearchInput.id}
        name={mockSearchInput.name}
        onChange={onSearchMock}
        debouceTimeMiliseconds={mockSearchInput.debouceTimeMiliseconds}
      ></SearchInput>
    );

    const inputElement = await screen.findByRole<HTMLInputElement>("textbox");

    let newSearchValue = "";
    for (let i = 0; i < 3; i++) {
      const newChar = (((1 + Math.random()) * 0x10000) | 0)
        .toString(16)
        .substring(1);
      newSearchValue += newChar;

      fireEvent.change(inputElement, {
        target: { value: inputElement.value + newChar },
      });
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    await new Promise((resolve) =>
      setTimeout(resolve, mockSearchInput.debouceTimeMiliseconds)
    );
    expect(onSearchMock).toBeCalledTimes(1);
    expect(onSearchMock).toBeCalledWith(newSearchValue);
  });
});
