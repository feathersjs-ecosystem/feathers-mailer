import { createTransport, SendMailOptions, TransportOptions } from 'nodemailer';
import { MailerInferCreateTransport, AnyTransport } from './types';

export * from 'nodemailer';
export * from './types';

export class Service<T extends AnyTransport = AnyTransport, Defaults extends Parameters<MailerInferCreateTransport<T>>[1] = Parameters<MailerInferCreateTransport<T>>[1]> {
  transporter: ReturnType<MailerInferCreateTransport<T>>;
  constructor (transport: T, defaults?: Defaults) {
    if (!transport) {
      throw new Error('feathers-mailer: constructor `transport` must be provided');
    }

    this.transporter = createTransport(transport, defaults) as ReturnType<MailerInferCreateTransport<T>>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async _create (body: SendMailOptions, _params?: any) {
    // TODO maybe body should be text/html field
    // and params is rest of options

    // https://github.com/nodemailer/nodemailer#set-up-smtp says:
    // If callback argument is not set then the method returns a Promise object.
    return await this.transporter.sendMail(body);
  }

  create (body: SendMailOptions, params?: any) {
    return this._create(body, params);
  }
}

export default function init<T extends AnyTransport = AnyTransport, Defaults extends Parameters<MailerInferCreateTransport<T>>[1] = TransportOptions> (transport: T, defaults?: Defaults) {
  return new Service<T, Defaults>(transport, defaults);
}

if (typeof module !== 'undefined') {
  module.exports = Object.assign(init, module.exports);
}
