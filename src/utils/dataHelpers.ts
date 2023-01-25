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
  const dataNow = dayjs();
  const day = 100 * 60 * 60 * 24;
  const oneMonth = day * 31;
  return (+dataNow - +createDate) < oneMonth;
};

export default {
  convertInNumber,
  convertInString,
  checkIsNew,
};
