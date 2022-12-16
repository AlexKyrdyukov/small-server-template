class CustomError extends Error {
  status: number;

  message: string;

  payload?: unknown;

  constructor(
    status: number, message: string, payload?: { errors?: unknown; textMessage: string },
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.payload = payload;
  }
}

export default CustomError;
