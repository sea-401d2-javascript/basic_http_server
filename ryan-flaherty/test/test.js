'use strict';

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var request = chai.request;
var expect = chai.expect;

require(__dirname + '/../index.js');

describe('vanilla http server tests', () => {

  it('should respond with the time', (done) => {
    var timeTest = new Date;
    request('localhost:3000')
      .get('/time')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).have.status(200);
        expect(res.text).to.include(timeTest.toString().slice(0, 21));
        done();
      });
  });
  it('should respond with the url with "Greetings test"', (done) => {
    request('localhost:3000')
      .get('/greet/test')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).have.status(200);
        expect(res.text).to.include('Greetings test');
        done();
      });
  });
  it('should receive JSON data', (done) => {
    request('localhost:3000')
      .post('/post')
      .send({'name': 'test'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).have.status(200);
        expect(res.text).to.eql('Post Received');
        done();
      });
  });
  it('should get back a 404', (done) => {
    request('localhost:3000')
      .get('/404')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(404);
        done();
      });
  });
});
