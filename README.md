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

If using a [transport plugin](https://github.com/nodemailer/nodemailer#send-using-a-transport-plugin), install the respective module.


## API

### `import Mailer from 'feathers-mailer'`

### `mailer = Mailer(transport, defaults)`

- `transport` can be either [SMTP options](https://github.com/nodemailer/nodemailer#set-up-smtp) or a [transport plugin](https://github.com/nodemailer/nodemailer#send-using-a-transport-plugin) with associated options.
- `defaults` is an object that defines default values for mail options.

### `mailer.create(body, params)`

`mailer.create` is a thin wrapper for [`transporter.sendMail`](https://github.com/nodemailer/nodemailer#sending-mail), accepting `body` and returning `err` and `info`.

See [here](https://github.com/nodemailer/nodemailer#e-mail-message-fields) for possible fields of `body`.

## Example

```js
import Mailer from 'feathers-mailer'
import mandrill from 'nodemailer-mandrill-transport'

// Register the service, see below for an example
app.use('/mailer', Mailer(mandrill({
  auth: {
    apiKey: process.env.MANDRILL_API_KEY
  }
})));

// Use the service
var email = {
   from: 'FROM_EMAIL',
   to: 'TO_EMAIL',
   subject: 'Sendgrid test',
   html: 'This is the email body'
};

app.service('mailer').create(email).then(function (result) {
  console.log('Sent email', result);
}).catch(err => {
  console.log(err);
});
```

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
