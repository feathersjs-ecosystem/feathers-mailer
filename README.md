# feathers-mailer

[![Greenkeeper badge](https://badges.greenkeeper.io/feathersjs-ecosystem/feathers-mailer.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/feathersjs-ecosystem/feathers-mailer.png?branch=master)](https://travis-ci.org/feathersjs-ecosystem/feathers-mailer)
[![Dependency Status](https://img.shields.io/david/feathersjs-ecosystem/feathers-mailer.svg?style=flat-square)](https://david-dm.org/feathersjs-ecosystem/feathers-mailer)
[![Download Status](https://img.shields.io/npm/dm/feathers-mailer.svg?style=flat-square)](https://www.npmjs.com/package/feathers-mailer)

> Feathers mailer service using [`nodemailer`](https://github.com/nodemailer/nodemailer)

## Installation

```shell
npm install feathers-mailer --save
```

If using a [transport plugin](https://nodemailer.com/transports/), install the respective module.


## API

```js
const mailer = require('feathers-mailer');
```

### `app.use('/emails', mailer(transport, defaults))`

- `transport` can be either [SMTP options](https://nodemailer.com/smtp/#general-options) or a [transport plugin](https://nodemailer.com/transports/) with associated options.
- `defaults` is an object that defines default values for mail options.

### `service.create(body, params)`

`service.create` is a thin wrapper for [`transporter.sendMail`](https://nodemailer.com/usage/#sending-mail), accepting `body` and returning a promise.

See [here](https://nodemailer.com/message/#commmon-fields) for possible fields of `body`.

## Example with Mandrill

```js
const mailer = require('feathers-mailer');
const mandrill = require('nodemailer-mandrill-transport');

// Register the service, see below for an example
app.use('/mailer', mailer(mandrill({
  auth: {
    apiKey: process.env.MANDRILL_API_KEY
  }
})));

// Use the service
const email = {
   from: 'FROM_EMAIL',
   to: 'TO_EMAIL',
   subject: 'Mandrill test',
   html: 'This is the email body'
};

app.service('mailer').create(email).then(function (result) {
  console.log('Sent email', result);
}).catch(err => {
  console.log(err);
});
```

## Example with Smtp (ethereal)

```js
const mailer = require('feathers-mailer');
const nodemailer = require('nodemailer');

(async function (app) {
  const account = await nodemailer.createTestAccount(); // internet required

  const transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure, // 487 only
    requireTLS: true,
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass // generated ethereal password
    }
  });

  app.use('mailer', Mailer(transporter, {from: process.env.FROM_EMAIL});

  // Use the service
  const email = {
     from: account.user, // From email address
     to: 'president@mars.com',
     subject: 'SMTP test',
     html: 'This is the email body'
  };

  await app.service('mailer').create(email)
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
})(app)
```

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
