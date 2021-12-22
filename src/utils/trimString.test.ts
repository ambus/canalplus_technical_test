import { trimString } from "./trimString";

describe("trimString", () => {
  let startString: string;
  beforeEach(() => {
    startString = "Lorem ipsum dolor sit amet";
  });

  it("should cut given string to the given length and add 3 dots at the end", () => {
    const truncatedString = trimString(startString, 10);
    expect(truncatedString.length).toEqual(13);
    expect(truncatedString.endsWith("...")).toBeTruthy();
  });

  it("should return given string without adding any dots if it shorter than the specified value for the length parameter", () => {
    const truncatedString = trimString(startString, 26);
    expect(truncatedString.length).toEqual(startString.length);
    expect(truncatedString).toEqual(startString);
    expect(truncatedString.endsWith("...")).toBeFalsy();
  });

  it("should return only dots if length parameter is 0", () => {
    const truncatedString = trimString(startString, 0);
    expect(truncatedString).toEqual("...");
  });

  it("should return only dots if length parameter is smaller than 0", () => {
    const truncatedString = trimString(startString, -2);
    expect(truncatedString).toEqual("...");
  });

  it("should return only dots if length parameter is NEGATIVE_INFINITY", () => {
    const truncatedString = trimString(startString, Number.NEGATIVE_INFINITY);
    expect(truncatedString).toEqual("...");
  });
  it("should return not truncated stringif length parameter is NEGATIVE_INFINITY", () => {
    const truncatedString = trimString(startString, Number.POSITIVE_INFINITY);
    expect(truncatedString).toEqual(startString);
  });

  it("should return undefined if given string is undefined", () => {
    const truncatedString = trimString(undefined as unknown as string, 10);
    expect(truncatedString).toBeUndefined();
  });

  it("should return empty string if given string is empty", () => {
    const truncatedString = trimString("", 0);
    expect(truncatedString).toBe("");
  });
});
