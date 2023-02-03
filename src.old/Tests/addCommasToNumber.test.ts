import addCommasToNumber from "../Utils/addCommasToNumber";

describe("addCommasToNumber", () => {
  it("should add commas to a number", () => {
    const number = 1234567890;
    const result = addCommasToNumber(number);
    expect(result).toBe("1,234,567,890");
  });
});
