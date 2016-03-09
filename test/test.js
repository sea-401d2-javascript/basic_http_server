'use strict';

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server.js');

describe('http server', () => {
  it('should respond to /greet/ with greeting', (done) => {
    request('localhost:3000')
    .get('/greet/TERRY')
    .end((err, data) => {
      expect(err).to.eql(null);
      expect(data).to.have.status(200);
      expect(data).to.have.header('content-type','text/html');
      expect(data.text).to.eql('Welcome TERRY, this is life now.');
      done();
    })
  })

  it('should respond to /time with time', (done) => {
    request('localhost:3000')
    .get('/time')
    .end((err, data) => {
      expect(err).to.eql(null);
      expect(data).to.have.status(200);
      expect(data).to.have.header('content-type','text/html');
      expect(typeof data.text).to.eql('string');
      done();
    })
  })

  it('should respond to /greet with a json object', (done) => {
    request('localhost:3000')
    .post('/greet/TERRY')
    .end((err, data) => {
      expect(err).to.eql(null);
      expect(data).to.have.status(200);
      expect(data).to.have.header('content-type','application/json');
      expect(data.body).to.eql({Greeting:'Welcome TERRY'});
      done();
    })
  })

  it('should respond to 404 with nope + sad wink', (done) =>{
    request('localhost:3000')
    .get('/na')
    .end((err, data) => {
      expect(err).to.not.eql(null);
      expect(data).to.have.status(404);
      expect(data).to.have.header('content-type','text/html');
      expect(data.text).to.eql('Nope ;( ');
      done();
    })
  })
})
