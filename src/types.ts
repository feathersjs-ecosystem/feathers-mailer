import type {
  JSONSentMessageInfo,
  SESSentMessageInfo,
  SMTPPoolSentMessageInfo,
  SMTPSentMessageInfo,
  SMTPTransportOptions,
  SendmailSentMessageInfo,
  SentMessageInfo,
  StreamSentMessageInfo,
  Transport,
  TransportConfig,
} from 'nodemailer'

/**
 * Anything `nodemailer.createTransport` accepts: the options object of one of
 * the bundled transports, an SMTP connection URL, or a transport plugin.
 */
export type AnyTransport = TransportConfig | Transport<any> | string

/**
 * The `info` object the given transport resolves `sendMail` with.
 *
 * Since nodemailer 10 ships its own `createTransport` overloads, this mirrors
 * their discriminants and their order, so `Service<T>` infers the same result
 * type that a direct `createTransport(transport)` call would.
 */
export type MailerInferSentMessageInfo<T extends AnyTransport> = T extends {
  pool: true
}
  ? SMTPPoolSentMessageInfo
  : T extends { sendmail: true | string }
    ? SendmailSentMessageInfo
    : T extends { streamTransport: true }
      ? StreamSentMessageInfo
      : T extends { jsonTransport: true }
        ? JSONSentMessageInfo
        : T extends { SES: object }
          ? SESSentMessageInfo
          : T extends Transport<infer U>
            ? U
            : T extends SMTPTransportOptions | string
              ? SMTPSentMessageInfo
              : SentMessageInfo
