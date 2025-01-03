# feathers-mailer

[![Node.js CI](https://github.com/feathersjs-ecosystem/feathers-mailer/actions/workflows/node.js.yml/badge.svg)](https://github.com/feathersjs-ecosystem/feathers-mailer/actions/workflows/node.js.yml)
![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/feathersjs-ecosystem/feathers-mailer)
[![Download Status](https://img.shields.io/npm/dm/feathers-mailer.svg?style=flat-square)](https://www.npmjs.com/package/feathers-mailer)

> Feathers mailer service using [`nodemailer`](https://github.com/nodemailer/nodemailer)

## Installation

```shell
npm install feathers-mailer --save
```

If using a [transport plugin](https://nodemailer.com/transports/), install the respective module.

## API

```ts
import { Service } = from 'feathers-mailer';

app.use('/emails', new Service(transport, defaults));
```

- `transport` can be either [SMTP options](https://nodemailer.com/smtp/#general-options) or a [transport plugin](https://nodemailer.com/transports/) with associated options.
- `defaults` is an object that defines default values for mail options.

### `service.create(body, params)`

`service.create` is a thin wrapper for [`transporter.sendMail`](https://nodemailer.com/usage/#sending-mail), accepting `body` and returning a promise.

See [here](https://nodemailer.com/message/#commmon-fields) for possible fields of `body`.

## Example with SMTP (ethereal)

```js
import { Service } from "feathers-mailer";
import nodemailer from "nodemailer";

(async function (app) {
  const account = await nodemailer.createTestAccount(); // internet required

  const transporter = {
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure, // 487 only
    requireTLS: true,
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass, // generated ethereal password
    },
  };

  // Register service and setting default From Email
  app.use("mailer", new Service(transporter, { from: account.user }));

  // Use the service
  const email = {
    to: "president@mars.com",
    subject: "SMTP test",
    html: "This is the email body",
  };

  await app.service("mailer").create(email);
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
})(app);
```

## Example with Mandrill

```js
import { Service } from "feathers-mailer";
import mandrill from "nodemailer-mandrill-transport";

// Register the service, see below for an example
app.use(
  "/mailer",
  new Service(
    mandrill({
      auth: {
        apiKey: process.env.MANDRILL_API_KEY,
      },
    })
  )
);

// Use the service
const email = {
  from: "FROM_EMAIL",
  to: "TO_EMAIL",
  subject: "Mandrill test",
  html: "This is the email body",
};

app
  .service("mailer")
  .create(email)
  .then(function (result) {
    console.log("Sent email", result);
  })
  .catch((err) => {
    console.log(err);
  });
```

## Prevent mail to be treated as spam
#### DKIM to prevent mail to be treated as spam
A more and more appearing 'issue' these days, is that mail sent can be seen as spam. Especially if the 'from address' is not linked to the IP of the sending host. To prevent this, you can use a DKIM record. It does require a DNS mutation on the domain reflecting the 'from address', but it will prevent this. Following these steps you can implement this in `node-mailer`

1. Go to https://easydmarc.com/tools/DKIM-record-generator to generate a DKIM record. In the form, enter the domain name (equal to the `from address` domain), and something to use as a selector e.g. `feathersMailer`.
2. Ask a network administrator to publish the record which is generated in the domain.
3. Ensure the record is active using https://easydmarc.com/tools/dkim-lookup. Once the test passes, continue (it might need time to replicate across the web)
4. Add the following information to the `email` constance defined in the example above, so it becomes like this
```js
  const email = {
     to: 'president@mars.com',
     subject: 'SMTP test',
     html: 'This is the email body',
     domainName: 'THE DOMAIN ENTERED FOR THE RECORD (FROM ADDRESS DOMAIN)',
     keySelector: 'THE SELECTOR YOU ENTERED TO GENERATE THE RECORD',
     privateKey: 'THE CONTENT FROM THE `PRIVATE KEY` BUT REPLACE `linebreaks` WITH `\n`'
  };
```
***Important:*** You must replace the `linebreaks` of the private key with `\n` or it won't work.

A use case for this, could be a multitenancy application. There the reply domains would be different, but you might want to send from the local SMTP server of the ISP. You would then make it possible for each tenant to configure the three values in their tenant settings within the application, and dynamically collect it prior to sending the mail.

## License

Copyright (c) 2025

Licensed under the [MIT license](LICENSE).
