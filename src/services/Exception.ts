type InitType = {
  status: number;
  message: string;
  payload?: unknown;
};

class Exception extends Error {
  status: number;

  message: string;

  payload?: unknown;

  constructor(init: {
    status: number;
    message: string;
    payload?: unknown;
  }) {
    super(init?.message || 'internal server error');
    this.status = init?.status || 500;
    this.message = init?.message || 'internal server error';
    this.payload = init?.payload || null;
  }

  static createError = (init?: InitType) => {
    return new Exception(init);
  };
}

export default Exception;
