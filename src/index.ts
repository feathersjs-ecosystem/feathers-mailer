import { createTransport } from 'nodemailer'
import type {
  MailDefaults,
  SendMailOptions,
  TransportConfig,
  Transporter,
} from 'nodemailer'
import type { AnyTransport, MailerInferSentMessageInfo } from './types.js'

export * from 'nodemailer'
export * from './types.js'

export class Service<T extends AnyTransport = AnyTransport> {
  transporter: Transporter<MailerInferSentMessageInfo<T>>

  constructor(transport: T, defaults?: MailDefaults) {
    if (!transport) {
      throw new Error(
        'feathers-mailer: constructor `transport` must be provided',
      )
    }

    this.transporter = createTransport(
      transport as TransportConfig,
      defaults,
    ) as Transporter<MailerInferSentMessageInfo<T>>
  }

  async _create(body: SendMailOptions, _params?: any) {
    // TODO maybe body should be text/html field
    // and params is rest of options

    // https://nodemailer.com/usage/#sending-mail says:
    // If callback argument is not set then the method returns a Promise object.
    return await this.transporter.sendMail(body)
  }

  create(body: SendMailOptions, params?: any) {
    return this._create(body, params)
  }
}

export default function init<T extends AnyTransport = AnyTransport>(
  transport: T,
  defaults?: MailDefaults,
) {
  return new Service<T>(transport, defaults)
}
