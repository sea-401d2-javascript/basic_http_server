' use strict'

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server.js');

describe('HTTP server test suite', () => {
  var date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  var seconds = date.getSeconds();
  var time = hour + ':' + min + ' ' + seconds + 's PST';

  it('should respond with current server time', (done) => {
    request('localhost:3000')
    .get('/time')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('The current server time is: ' + time);
      done();
    })
  })

  it('should respond with hello testname!', (done) => {
    request('localhost:3000')
      .get('/greet/testname')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello, testname!');
        done();
      })
  })

  it('should respond with hello poop!', (done) => {
    request('localhost:3000')
      .post('/greet')
      .send({'name': 'bob'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('hello bob');
        done();
      })
  })

})
