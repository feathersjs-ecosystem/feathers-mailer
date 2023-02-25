import { Transport as _Transport, Transporter, createTransport, SendMailOptions, TransportOptions } from 'nodemailer';
import makeDebugger from 'debug';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import type SMTPPool from 'nodemailer/lib/smtp-pool';
import type SendmailTransport from 'nodemailer/lib/sendmail-transport';
import type StreamTransport from 'nodemailer/lib/stream-transport';
import type JSONTransport from 'nodemailer/lib/json-transport';
import type SESTransport from 'nodemailer/lib/ses-transport';

const debug = makeDebugger('feathers-mailer')

type Transport = SMTPTransport | SMTPTransport.Options | string | SMTPPool | SMTPPool.Options | SendmailTransport | SendmailTransport.Options | StreamTransport | StreamTransport.Options | JSONTransport | JSONTransport.Options | SESTransport | SESTransport.Options | _Transport | TransportOptions;
type InferCreateTransport<T extends Transport> =
  T extends SMTPTransport | SMTPTransport.Options | string
    ? (t: T, d?: SMTPTransport.Options) => Transporter<SMTPTransport.SentMessageInfo>
    : T extends SMTPPool | SMTPPool.Options
      ? (t: T, d?: SMTPPool.Options) => Transporter<SMTPPool.SentMessageInfo>
      : T extends SendmailTransport | SendmailTransport.Options
        ? (t: T, d?: SendmailTransport.Options) => Transporter<SendmailTransport.SentMessageInfo>
        : T extends StreamTransport | StreamTransport.Options
          ? (t: T, d?: StreamTransport.Options) => Transporter<StreamTransport.SentMessageInfo>
          : T extends JSONTransport | JSONTransport.Options
            ? (t: T, d?: JSONTransport.Options) => Transporter<JSONTransport.SentMessageInfo>
            : T extends SESTransport | SESTransport.Options
              ? (t: T, d?: SESTransport.Options) => Transporter<SESTransport.SentMessageInfo>
              : T extends _Transport<infer U> | TransportOptions
                ? (t: T, d?: TransportOptions) => Transporter<U>
                : never;

export class Service<T extends Transport, Defaults extends Parameters<InferCreateTransport<T>>[1]> {
  transporter: ReturnType<InferCreateTransport<T>>;
  constructor (transport: Transport, defaults?: Defaults) {
    debug('constructor', transport);

    if (!transport) {
      throw new Error('feathers-mailer: constructor `transport` must be provided');
    }

    this.transporter = createTransport(transport, defaults) as ReturnType<InferCreateTransport<T>>;
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

export default function init<T extends Transport = _Transport, Defaults extends Parameters<InferCreateTransport<T>>[1] = TransportOptions> (transport: Transport, defaults?: Defaults) {
  return new Service<T, Defaults>(transport, defaults);
}

if (typeof module !== 'undefined') {
  module.exports = Object.assign(init, module.exports);
}
