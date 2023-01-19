class Logger {
  static getTime() {
    return new Date().toLocaleString();
  }

  static error(info: string | NodeJS.ErrnoException) {
    const data = this.getTime();
    console.error('data:', `${data},`, 'TYPE ERROR;', '\n message:', info);
  }

  static log(info: string) {
    const data = this.getTime();
    // eslint-disable-next-line no-console
    console.log('data:', `${data},`, 'TYPE LOG;', '\n message:', info);
  }

  static warn(info: string) {
    const data = this.getTime();
    console.warn('data:', `${data},`, 'TYPE WARN;', '\n message:', info);
  }

  static assert(info: string) {
    const data = this.getTime();
    // eslint-disable-next-line no-console
    console.assert('data:', `${data},`, 'TYPE ASSERT;', '\n message:', info);
  }

  static debug(info: string) {
    const data = this.getTime();
    // eslint-disable-next-line no-console
    console.debug('data:', `${data},`, 'TYPE DEBUG;', '\n message:', info);
  }

  static info(info: string) {
    const data = this.getTime();
    // eslint-disable-next-line no-console
    console.info('data:', `${data},`, 'TYPE INFO;', '\n message:', info);
  }
}

export default Logger;
