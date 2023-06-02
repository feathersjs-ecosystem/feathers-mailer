import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import type SMTPPool from 'nodemailer/lib/smtp-pool';
import type SendmailTransport from 'nodemailer/lib/sendmail-transport';
import type StreamTransport from 'nodemailer/lib/stream-transport';
import type JSONTransport from 'nodemailer/lib/json-transport';
import type SESTransport from 'nodemailer/lib/ses-transport';
import { Transport as _Transport, Transporter, TransportOptions } from 'nodemailer';

export {
  SMTPTransport,
  SMTPPool,
  SendmailTransport,
  StreamTransport,
  JSONTransport,
  SESTransport
}

export type AnyTransport = SMTPTransport | SMTPTransport.Options | string | SMTPPool | SMTPPool.Options | SendmailTransport | SendmailTransport.Options | StreamTransport | StreamTransport.Options | JSONTransport | JSONTransport.Options | SESTransport | SESTransport.Options | _Transport | TransportOptions;
export type MailerInferCreateTransport<T extends AnyTransport> =
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
