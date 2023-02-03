import addCommasToNumber from "./addCommasToNumber";

const turnBillionsIntoWords = (number: number): string => {
  const billions = Math.floor(number / 1000000000);
  const millions = Math.floor((number - billions * 1000000000) / 1000000)
    .toString()
    .charAt(0);
  return `${billions}${millions !== "0" ? `,${millions}` : ""}B`;
};
const turnMillionsIntoWords = (number: number): string => {
  const millions = Math.floor(number / 1000000);
  const thousands = Math.floor((number - millions * 1000000) / 1000)
    .toString()
    .charAt(0);
  return `${millions}${thousands !== "0" ? `,${thousands}` : ""}M`;
};

const turnNumerIntoWords = (number: number): string => {
  if (number.toString().length > 9) return turnBillionsIntoWords(number);
  if (number.toString().length > 6) return turnMillionsIntoWords(number);
  return addCommasToNumber(number);
};
export default turnNumerIntoWords;
