if(!global._babelPolyfill) { require('babel-polyfill'); }

import makeDebug from 'debug';
import Proto from 'uberproto';
import Mailer from 'nodemailer';
//import errors from 'feathers-errors';

const debug = makeDebug('feathers-mailer');

class Service {
  constructor (options) {
    debug('constructor', options);
    if (!options) {
      throw new Error('feathers-mailer: constructor `options` must be provided');
    }

    if (!options.Model) {
      throw new Error('feathers-mailer: constructor `options.Model` must be provided');
    }

    this.Model = Mailer.createTransport(
      options.Model,
      options.defaults
    );
    this.id = options.id || 'id';
  }

  extend (obj) {
    return Proto.extend(obj, this);
  }

  create (body, params, cb) {
    debug('create', body, params);
    // TODO maybe body should be text/html field
    // and params is rest of options
    this.Model.sendMail(body, cb);
  }
}

export default function init(options) {
  return new Service(options);
}

init.Service = Service;
