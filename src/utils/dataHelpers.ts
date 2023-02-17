const convertBookPrice = (price: number) => {
  return (price / 100).toFixed(2);
};

const SECOND = 1000;
const MINUT = SECOND * 60;
const HOUR = MINUT * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;

const checkIsNewBook = (createDate: Date) => {
  const dataNow = Date.now();
  return (dataNow - +createDate) < MONTH;
};

export default {
  checkIsNewBook,
  convertBookPrice,
};
