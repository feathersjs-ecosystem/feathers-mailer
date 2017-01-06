import Debug from 'debug';
import Proto from 'uberproto';
import Mailer from 'nodemailer';
// import errors from 'feathers-errors';

const debug = Debug('feathers-mailer');

class Service {
  constructor (transport, defaults) {
    debug('constructor', transport);

    if (!transport) {
      throw new Error('feathers-mailer: constructor `transport` must be provided');
    }

    this.transporter = Mailer.createTransport(transport, defaults);
  }

  extend (obj) {
    return Proto.extend(obj, this);
  }

  create (body, params, cb) {
    debug('create', body, params);

    // TODO maybe body should be text/html field
    // and params is rest of options

    // https://github.com/nodemailer/nodemailer#set-up-smtp says:
    // If callback argument is not set then the method returns a Promise object.
    return this.transporter.sendMail(body);
  }
}

export default function init (transport, defaults) {
  return new Service(transport, defaults);
}

init.Service = Service;
