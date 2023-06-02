import { Transport as _Transport, createTransport, SendMailOptions, TransportOptions } from 'nodemailer';
import makeDebugger from 'debug';
import { MailerInferCreateTransport, AnyTransport } from './types';

const debug = makeDebugger('feathers-mailer')

export * from 'nodemailer';
export * from './types';

export class Service<T extends AnyTransport = AnyTransport, Defaults extends Parameters<MailerInferCreateTransport<T>>[1] = Parameters<MailerInferCreateTransport<T>>[1]> {
  transporter: ReturnType<MailerInferCreateTransport<T>>;
  constructor (transport: AnyTransport, defaults?: Defaults) {
    debug('constructor', transport);

    if (!transport) {
      throw new Error('feathers-mailer: constructor `transport` must be provided');
    }

    this.transporter = createTransport(transport, defaults) as ReturnType<MailerInferCreateTransport<T>>;
  }

  async _create (body: SendMailOptions, params?: any) {
    debug('create', body, params);

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

export default function init<T extends AnyTransport = _Transport, Defaults extends Parameters<MailerInferCreateTransport<T>>[1] = TransportOptions> (transport: AnyTransport, defaults?: Defaults) {
  return new Service<T, Defaults>(transport, defaults);
}

if (typeof module !== 'undefined') {
  module.exports = Object.assign(init, module.exports);
}
