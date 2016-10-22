import mandrill from 'nodemailer-mandrill-transport';
import Mailer from '../src';
import feathers from 'feathers';
import rest from 'feathers-rest';
import bodyParser from 'body-parser';

const mailer = Mailer(mandrill({
  auth: {
    apiKey: process.env.MANDRILL_API_KEY || 'notakey'
  }
}));

// Create a feathers instance.
var app = feathers()
  // Enable REST services
  .configure(rest())
  // Turn on JSON parser for REST services
  .use(bodyParser.json())
  // Turn on URL-encoded parser for REST services
  .use(bodyParser.urlencoded({extended: true}))
  .use('/mailer', mailer);

// A basic error handler, just like Express
app.use(function (error, req, res, next) {
  res.json(error);
});

// Start the server
module.exports = app.listen(3030);

console.log('feathers-mailer service running on 127.0.0.1:3030/mailer');
