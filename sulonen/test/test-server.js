'use strict';

const chai = require('chai');
const chai_http = require('chai-http');
chai.use(chai_http);
const request = chai.request;
const expect = chai.expect;

require('./../server.js');

describe('HTTP Server Tests', () => {
  it('should respond to /time with current time', (done) => {
    request('localhost:3000')
      .get('/time')
      .end((err, res) => {
        if (err) throw err;
        var regex = new RegExp(/\d+:\d+:\d+/);
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(regex.test(res.text)).to.eql(true);
        done();
      });
  });

  it('should respond to /greet/<something> with message', (done) => {
    request('localhost:3000')
      .get('/greet/David')
      .end((err, res) => {
        if (err) throw err;
        var name = new RegExp(/David!\n/);
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(name.test(res.text)).to.equal(true);
        done();
      });
  });

  it('should respond to /greet {JSON} with message', (done) => {
    request('localhost:3000')
      .post('/greet')
      .send('{user:David}')
      .end((err, res) => {
        if (err) throw err;
        var name = new RegExp(/David/);
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(name.test(res.text)).to.eql(true);
        done();
      });
  });
});
