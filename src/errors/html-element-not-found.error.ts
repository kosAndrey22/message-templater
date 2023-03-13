export class HTMLElementNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, HTMLElementNotFoundError.prototype);
    this.name = 'HTMLElementNotFoundError';
  }
}
