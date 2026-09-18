import init, { Service } from '../src/index.js'

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
  `,
}

describe('feathers-mailer', () => {
  it('exports a Service class and a default initializer', () => {
    expect(typeof Service).toBe('function')
    expect(typeof init).toBe('function')
    expect(init({ jsonTransport: true })).toBeInstanceOf(Service)
  })

  it('throws without a transport', () => {
    // @ts-expect-error `transport` is required
    expect(() => new Service()).toThrow(
      'feathers-mailer: constructor `transport` must be provided',
    )
  })

  it('sends mail and resolves with the transport result', async () => {
    const mailer = new Service({ jsonTransport: true })

    const info = await mailer.create(mailData)

    expect(info.envelope.from).toBe('alice@example.com')
    expect(info.envelope.to).toEqual(['bob@example.com', 'carol@example.com'])
    expect(info.messageId).toBeTruthy()

    const message = JSON.parse(info.message as string)
    expect(message.subject).toBe(mailData.subject)
    expect(message.text).toBe(mailData.text)
  })

  it('applies the defaults passed to the constructor', async () => {
    const mailer = new Service({ jsonTransport: true }, { from: mailData.from })

    // `from` is deliberately omitted - it comes from the defaults. Passing it
    // as `undefined` would override the default instead of falling back to it.
    const { from: _from, ...withoutFrom } = mailData
    const info = await mailer.create(withoutFrom)

    expect(info.envelope.from).toBe('alice@example.com')
  })
})
