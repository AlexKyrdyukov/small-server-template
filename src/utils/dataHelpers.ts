import dayjs from 'dayjs';

const convertInString = (price: number) => {
  if (price < 100) {
    return (price).toString();
  }
  return (price / 100).toFixed(2);
};

const convertInNumber = (price: string) => {
  return +price;
};

const checkIsNew = (createDate: Date) => {
  const sec = 1000;
  const min = sec * 60;
  const hour = min * 60;
  const day = hour * 24;
  const month = day * 30;
  const dataNow = dayjs();
  return (+dataNow - +createDate) < month;
};

export default {
  checkIsNew,
  convertInNumber,
  convertInString,
};
