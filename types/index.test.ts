import feathers from '@feathersjs/feathers';
import { Service } from "feathers-mailer";
import * as smtpTransport from 'nodemailer-smtp-transport';
import * as Mail from "nodemailer/lib/mailer";

const app = feathers();

// SMTP Test
const smtpOptions: smtpTransport.SmtpOptions = {
  host: 'smtpHost',
  port: 123,
  secure: true,
  requireTLS: true,
  auth: {
    user: 'username',
    pass: 'password'
  }
};

app.use('/smtp-mailer', new Service(smtpTransport(smtpOptions)));

const service: Service = app.service('/smtp-mailer');

const email: Mail.Options = {
  from: 'from@example.com',
  to: 'to@example.com',
  cc: 'cc@example.com',
  bcc: 'bcc@example.com',
  text: 'Plain text body',
  html: '<div>Html body</div>'
};

service.create(email).then(sentMessageInfo => {
  // Unfortunately SentMessageInfo is just an alias for 'any' type in nodemailer types so no types for us here.
  console.log(sentMessageInfo.info);
});
