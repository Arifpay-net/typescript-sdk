import ArifpayException from './arifpayexception';

class ArifpayBadRequestException extends ArifpayException {
  msg: string;
  error: any;
  constructor(msg: string, error: any) {
    super(msg);
    this.msg = msg;
    this.error = error;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ArifpayBadRequestException.prototype);
  }
}

export default ArifpayBadRequestException;
