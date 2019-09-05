const assert = require('assert').strict;
const createMailer = require('../lib');
const stubTransport = require('nodemailer-stub-transport');
const addressParser = require('address-rfc2822');

describe('feathers-mailer', () => {
  it('basic functionality', done => {
    assert.equal(typeof createMailer, 'function', 'exports function');
    const mailer = createMailer(stubTransport());
    const mailData = {
      from: '"Alice" <alice@example.com>',
      to: ['bob@example.com', '"Carol" <carol@example.com>'],
      subject: 'The revolution will not be televised',
      text: `
        You will not be able to stay home, brother.
        You will not be able to plug in, turn on and cop out.
        You will not be able to lose yourself on skag and
        skip out for beer during commercials,
        Because the revolution will not be televised.
      `
    };
    mailer.create(mailData).then(function (info) {
      assert.equal(info.envelope.from, getEmailAddress(mailData.from));
      assert.deepEqual(info.envelope.to, mailData.to.map(getEmailAddress));
      assert.ok(info.messageId);
      assert.ok(info.response.toString());
      done();
    }).catch(function (err) {
      assert.ifError(err);
      done();
    });
  });
});

function getEmailAddress (contact) {
  return addressParser.parse(contact)[0].address;
}
