import config from '../../config';

const changePath = (image: string, path: string): string => {
  const fullPath = `${config.urls.current}/public/static/${path}/${image}`;
  return fullPath;
};

const valueCalculation = (value: number, divider: number) => {
  // eslint-disable-next-line no-console
  console.log(value / divider);
  // eslint-disable-next-line no-mixed-operators
  return value * divider / divider;
};

export default {
  changePath,
  valueCalculation,
};
