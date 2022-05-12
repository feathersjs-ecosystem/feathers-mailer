const Proto = require('uberproto');
const Mailer = require('nodemailer');
const debug = require('debug')('feathers-mailer');

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

  // needed for feathers dove
  async find (params) {
    return [];
  }

  async get (id, params) {
    return { id };
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }

  create (body, params) {
    debug('create', body, params);

    // TODO maybe body should be text/html field
    // and params is rest of options

    // https://github.com/nodemailer/nodemailer#set-up-smtp says:
    // If callback argument is not set then the method returns a Promise object.
    return this.transporter.sendMail(body);
  }
}

module.exports = function init (transport, defaults) {
  return new Service(transport, defaults);
};

module.exports.Service = Service;
