import config from '../../config';

const changePath = (image: string, path: string): string => {
  const fullPath = `${config.urls.current}/public/static/${path}/${image}`;
  return fullPath;
};

const valueCalculation = (value: number, divider: number) => {
  // eslint-disable-next-line no-mixed-operators
  const result = value * divider / divider;
  const stringValue = String(result);
  const last = stringValue.slice(-2);
  const first = stringValue.slice(0, -2);
  // eslint-disable-next-line no-console
  console.log(stringValue, first, last);
  return +`${first}.${last}`;
};

export default {
  changePath,
  valueCalculation,
};
