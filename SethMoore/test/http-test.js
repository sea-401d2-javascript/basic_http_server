'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http'); chai.use(chaiHTTP);
const request = chai.request;
const expect = chai.expect;
require(__dirname + '/../HTTP-server');

describe('http-server.js', () => {
  var curTime;
  before(() => curTime = new Date());
  it('should request /time and display the current time', (done) => {
    request('localhost:3000')
    .get('/time')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.text).to.eql('<h1>The Time Is...</h1><p>'+ curTime +'</p>');
      done();
    });
  });
  it('should request /greet/fred and display a greeting for "fred"', (done) => {
    request('localhost:3000')
    .get('/greet/fred')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.text).to.eql('<h1>Welcome</h1><p>Hello fred, welcome back.</p>');
      done();
    });
  });
  it('should send POST request to /greet and receive the message "JSON uploaded successfully"', (done) => {
    request('localhost:3000')
    .post('/greet')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.text).to.eql('JSON uploaded successfully');
      done();
    });
  });
});
