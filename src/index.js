if(!global._babelPolyfill) { require('babel-polyfill'); }

import makeDebug from 'debug';
import Proto from 'uberproto';
import Mailer from 'nodemailer';
//import errors from 'feathers-errors';

const debug = makeDebug('feathers-mailer');

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
    this.transporter.sendMail(body, cb);
  }
}

export default function init(transport, defaults) {
  return new Service(transport, defaults);
}

init.Service = Service;
