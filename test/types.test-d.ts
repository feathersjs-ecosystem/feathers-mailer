import { expectTypeOf } from 'vitest'
import { Service } from '../src/index.js'
import type {
  JSONSentMessageInfo,
  SESSentMessageInfo,
  SMTPPoolSentMessageInfo,
  SMTPSentMessageInfo,
  SESTransportOptions,
  SendmailSentMessageInfo,
  StreamSentMessageInfo,
  Transport,
} from 'nodemailer'

describe('transport inference', () => {
  it('infers the sent message info of each bundled transport', () => {
    expectTypeOf(
      new Service({ jsonTransport: true }).create,
    ).returns.resolves.toEqualTypeOf<JSONSentMessageInfo>()

    expectTypeOf(
      new Service({ streamTransport: true }).create,
    ).returns.resolves.toEqualTypeOf<StreamSentMessageInfo>()

    expectTypeOf(
      new Service({ sendmail: true }).create,
    ).returns.resolves.toEqualTypeOf<SendmailSentMessageInfo>()

    expectTypeOf(
      new Service({ pool: true, host: 'smtp.example.com' }).create,
    ).returns.resolves.toEqualTypeOf<SMTPPoolSentMessageInfo>()

    const ses = {} as NonNullable<SESTransportOptions['SES']>
    expectTypeOf(
      new Service({ SES: ses }).create,
    ).returns.resolves.toEqualTypeOf<SESSentMessageInfo>()
  })

  it('infers SMTP for plain options and for a connection URL', () => {
    expectTypeOf(
      new Service({ host: 'smtp.example.com', port: 587 }).create,
    ).returns.resolves.toEqualTypeOf<SMTPSentMessageInfo>()

    expectTypeOf(
      new Service('smtps://user:pass@smtp.example.com').create,
    ).returns.resolves.toEqualTypeOf<SMTPSentMessageInfo>()
  })

  it('infers the result type of a transport plugin', () => {
    interface CustomInfo {
      envelope: { from: string | false; to: string[] }
      messageId: string
      custom: number
    }

    const plugin = {} as Transport<CustomInfo>

    expectTypeOf(
      new Service(plugin).create,
    ).returns.resolves.toEqualTypeOf<CustomInfo>()
  })
})
