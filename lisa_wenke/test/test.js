'use strict';

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server');
var fs = require('fs');
var moment = require('moment');

describe('Testing Vanilla Server', () => {
  it('should respond to /time with moment', (done) => {
    request('localhost:3000')
    .get('/time')
    .end((err,res) => {
      expect(res).to.have.status(200);
      expect(err).to.eql(null);
      expect(res.text).to.eql(moment().format());
      done();
    });
  });
  it('should get name of greeting from /greet/name', (done) =>{
    request('localhost:3000')
    .get('/greet/Lisa')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(err).to.eql(null);
      expect(res.text).to.eql('hello, Lisa');
      done();
    });
  });

  it('should return hello, Lisa with post request', (done) => {
    request('localhost:3000')
    .post('/greet')
    .send({'name': 'Lisa' })
    .end((err, res)=> {
      expect(res).to.have.status(200);
      expect(err).to.eql(null);
      expect(res.text).to.eql('hello, Lisa');
      done();
    });
  });

});
