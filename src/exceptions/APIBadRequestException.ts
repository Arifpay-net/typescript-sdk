import ArifpayException from './arifpayexception';

class ArifpayBadRequestException extends ArifpayException {
  msg: string;
  constructor(msg: string) {
    super(msg);
    this.msg = msg;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ArifpayBadRequestException.prototype);
  }
}

export default ArifpayBadRequestException;
