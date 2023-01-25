import chalk from 'chalk';
import dayjs from 'dayjs';

const logger = {
  getTime() {
    return dayjs().format('YYYY-MM-DD | HH:mm:ss');
  },

  error(info: string | NodeJS.ErrnoException) {
    const data = this.getTime();
    console.error(chalk.red(`data: ${data}, TYPE ERROR;`), '\n message:', info);
  },

  log(info: string | NodeJS.ErrnoException) {
    const data = this.getTime();
    // eslint-disable-next-line no-console
    console.log(chalk.blue(`data: ${data}, TYPE LOG;`), '\n message:', info);
  },

  warn(info: string | NodeJS.ErrnoException) {
    const data = this.getTime();
    console.warn(chalk.greenBright(`data: ${data}, TYPE WARN;`), '\n message:', info);
  },

  assert(info: string | NodeJS.ErrnoException) {
    const data = this.getTime();
    // eslint-disable-next-line no-console
    console.assert(chalk.yellowBright(`data: ${data}, TYPE ASSERT;`), '\n message:', info);
  },

  debug(info: string | NodeJS.ErrnoException) {
    const data = this.getTime();
    // eslint-disable-next-line no-console
    console.debug(chalk.gray(`data: ${data}, TYPE DEBUG;`), '\n message:', info);
  },

  info(info: string | NodeJS.ErrnoException) {
    const data = this.getTime();
    // eslint-disable-next-line no-console
    console.info(chalk.bgYellowBright(`data: ${data}, TYPE INFO;`), '\n message:', info);
  },
};

export default logger;
