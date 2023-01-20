import chalk from 'chalk';

class Logger {
  static getTime() {
    return new Date().toLocaleString();
  }

  static error(info: string | NodeJS.ErrnoException) {
    const data = this.getTime();
    console.error(chalk.red(`data: ${data}, TYPE ERROR;`), '\n message:', info);
  }

  static log(info: string | NodeJS.ErrnoException) {
    const data = this.getTime();
    // eslint-disable-next-line no-console
    console.log(chalk.blue(`data: ${data}, TYPE LOG;`), '\n message:', info);
  }

  static warn(info: string | NodeJS.ErrnoException) {
    const data = this.getTime();
    console.warn(chalk.greenBright(`data: ${data}, TYPE WARN;`), '\n message:', info);
  }

  static assert(info: string | NodeJS.ErrnoException) {
    const data = this.getTime();
    // eslint-disable-next-line no-console
    console.assert(chalk.yellowBright(`data: ${data}, TYPE ASSERT;`), '\n message:', info);
  }

  static debug(info: string | NodeJS.ErrnoException) {
    const data = this.getTime();
    // eslint-disable-next-line no-console
    console.debug(chalk.gray(`data: ${data}, TYPE DEBUG;`), '\n message:', info);
  }

  static info(info: string | NodeJS.ErrnoException) {
    const data = this.getTime();
    // eslint-disable-next-line no-console
    console.info(chalk.bgYellowBright(`data: ${data}, TYPE INFO;`), '\n message:', info);
  }
}

export default Logger;
