class ArifpayNetworkException extends Error {
  msg: string;
  constructor(msg: string) {
    super(msg);
    this.msg = msg;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ArifpayNetworkException.prototype);
  }
}

export default ArifpayNetworkException;
