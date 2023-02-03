import turnNumerIntoWords from "../Utils/turnNumbersIntoWords";

describe("turnNumbersIntoWords", () => {
  it("should turn billions into words", () => {
    expect(turnNumerIntoWords(1123456789)).toBe("1,1B");
  });
  it("should turn millions into words", () => {
    expect(turnNumerIntoWords(22345678)).toBe("22,3M");
  });
  it("should turn exact billions into words", () => {
    expect(turnNumerIntoWords(1000000000)).toBe("1B");
  });
  it("should turn exact millions into words", () => {
    expect(turnNumerIntoWords(5000000)).toBe("5M");
  });
  it("should turn smaller numbers into numbers with commas", () => {
    expect(turnNumerIntoWords(123456)).toBe("123,456");
  });
});
