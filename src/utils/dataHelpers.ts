const convertInString = (price: number) => {
  if (price < 100) {
    return (price).toString();
  }
  return (price / 100).toFixed(2);
};

const convertInNumber = (price: string) => {
  return +price;
};

const checkIsNew = (dateIssue: string, createDate: Date) => {
  const data = new Date();
  if (dateIssue) {
    const [year, month, day] = dateIssue.split('-');
    const issueBook = new Date(+year, +month, +day);
    return (+data - +issueBook) < 267840000;
  }
  return (+data - +createDate) < 267840000;
};

export default {
  convertInNumber,
  convertInString,
  checkIsNew,
};
