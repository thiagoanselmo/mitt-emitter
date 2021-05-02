const expect = require('chai').expect;
const MittEmitter = require('../dist/mitt-emitter.umd');

describe('Start MittEmitter', function () {
  let mittEmitter;
  let events;

  before(function (done) {
    events = new Map();
    mittEmitter = new MittEmitter(events);
    done();
  });

  it('Single topic - .on()', () => {
    mittEmitter.on('mytopic', reveivedEvent => {
      expect(reveivedEvent).to.equal('test123');
    });

    expect(events.has('mytopic')).to.equal(true);
    mittEmitter.emit('mytopic', 'test123');
  });

  it('One sub-topic - .on()', () => {
    mittEmitter.on('organization.1', reveivedEvent => {
      expect(reveivedEvent).to.equal('test123');
    });

    expect(events.has('organization.1')).to.equal(true);
    mittEmitter.emit('organization.1', 'test123');
  });

  it('Two sub-topic - .on()', () => {
    const totalReceived = 3;
    let received = 0;

    mittEmitter.on('organization.*.dev', reveivedEvent => {
      expect(reveivedEvent).to.equal('test123');
      received++;
    });

    expect(events.has('organization.*.dev')).to.equal(true);

    mittEmitter.emit('organization.1.dev', 'test123');
    mittEmitter.emit('organization.2.dev', 'test123');
    mittEmitter.emit('organization.3.dev', 'test123');

    expect(received).to.equal(totalReceived);
  });

  it('Five sub-topic - .on()', () => {
    const totalReceived = 2;
    let received = 0;

    mittEmitter.on('organization.*.dev.1.*', reveivedEvent => {
      expect(reveivedEvent).to.equal('test123');
      received++;
    });

    expect(events.has('organization.*.dev')).to.equal(true);

    mittEmitter.emit('organization.1.dev.1.test', 'test123');
    mittEmitter.emit('organization.2.dev.1.test2', 'test123');
    mittEmitter.emit('organization.3.dev.2.test', 'test123');

    expect(received).to.equal(totalReceived);
  });

  it('Nest I sub-topic - .on()', () => {
    const totalReceived = 2;
    let received = 0;

    mittEmitter.on('organization.*.dev.#', reveivedEvent => {
      expect(reveivedEvent).to.equal('test123');
      received++;
    });

    expect(events.has('organization.*.dev.#')).to.equal(true);

    mittEmitter.emit('organization.1.dev.1.test.123', 'test123');
    mittEmitter.emit('organization.1.dev.2.apple.linux', 'test123');
    mittEmitter.emit('organization.1.dev', 'test123');
    expect(received).to.equal(totalReceived);
  });

  it('Nest II sub-topic - .on()', () => {
    const totalReceived = 3;
    let received = 0;

    mittEmitter.on('organization.#', reveivedEvent => {
      expect(reveivedEvent).to.equal('test123');
      received++;
    });

    expect(events.has('organization.#')).to.equal(true);

    mittEmitter.emit('organization.1.dev.1.test.123', 'test123');
    mittEmitter.emit('organization.1.dev.2.apple.linux', 'test123');
    mittEmitter.emit('organization.1.dev', 'test123');
    expect(received).to.equal(totalReceived);
  });
});
