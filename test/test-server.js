'use strict';

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var expect = require('chai').expect;

var request = chai.request;

require(__dirname + '/../server');
var newDate = new Date();
var fs = require('fs');

describe('HTTP server tests for routes', ()=>{
  it('Should respond to /time with message with current time', (done)=>{

    request('localhost:3000')
    .get('/time')
    .end((err, res)=>{
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });

  it('Should respond to the url ending in "/greet with user input"', (done)=>{
    request('localhost:3000')
    .get('/greet/Sam')
    .end((err, res)=>{
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('{"message":"Hello Sam"}');
      done();
    });
  });
  it('Should store POST request data sent from the superagent client', (done)=>{
    request('localhost:3000')
    .post('/greet')
    .send({'name': 'Pappy'})
    .end((err, res)=>{
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('{"name":"Pappy"}');
      done();
    });
  });
});
