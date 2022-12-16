class CustomError extends Error {
  status: number;

  message: string;

  payload?: unknown;

  constructor(
    status: number, message: string, payload?: unknown,
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.payload = payload;
    // this.payload.errors = payload.errors;
    // this.payload.textMessage = payload.textMessage;
  }
}

export default CustomError;
