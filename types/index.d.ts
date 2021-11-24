import { SentMessageInfo } from 'nodemailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as SMTPPool from 'nodemailer/lib/smtp-pool';
import * as JSONTransport from 'nodemailer/lib/json-transport';
import * as SESTransport from 'nodemailer/lib/ses-transport';
import * as StreamTransport from 'nodemailer/lib/stream-transport';
import * as SendmailTransport from 'nodemailer/lib/sendmail-transport';
import * as Mail from "nodemailer/lib/mailer";

export class Service {
  constructor(transport?: SMTPTransport | SMTPTransport.Options | string, defaults?: SMTPTransport.Options);
  constructor(transport?: SMTPPool | SMTPPool.Options, defaults?: SMTPPool.Options);
  constructor(transport?: SendmailTransport | SendmailTransport.Options, defaults?: SendmailTransport.Options);
  constructor(transport?: StreamTransport | StreamTransport.Options, defaults?: StreamTransport.Options);
  constructor(transport?: JSONTransport | JSONTransport.Options, defaults?: JSONTransport.Options);
  constructor(transport?: SESTransport | SESTransport.Options, defaults?: SESTransport.Options);

  extend(obj: Record<string, unknown>): Record<string, unknown>;

  create(body: Mail.Options, params?: never): Promise<SentMessageInfo>;
}

export default function init(transport?: SMTPTransport | SMTPTransport.Options | string, defaults?: SMTPTransport.Options): Service;
export default function init(transport?: SMTPPool | SMTPPool.Options, defaults?: SMTPPool.Options): Service;
export default function init(transport?: SendmailTransport | SendmailTransport.Options, defaults?: SendmailTransport.Options): Service;
export default function init(transport?: StreamTransport | StreamTransport.Options, defaults?: StreamTransport.Options): Service;
export default function init(transport?: JSONTransport | JSONTransport.Options, defaults?: JSONTransport.Options): Service;
export default function init(transport?: SESTransport | SESTransport.Options, defaults?: SESTransport.Options): Service;
