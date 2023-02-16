const convertInString = (price: number) => {
  return (price / 100).toFixed(2);
};

const SEC = 1000;
const MIN = SEC * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;

const checkIsNew = (createDate: Date) => {
  const dataNow = Date.now();
  return (dataNow - +createDate) < MONTH;
};

export default {
  checkIsNew,
  convertInString,
};
