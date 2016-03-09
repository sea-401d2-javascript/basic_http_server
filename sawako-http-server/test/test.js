'use strict';
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
var server = require( __dirname + '/../server.js');


describe('Vanilla http server testing', ()=>{

  it('should respond to /time with server time', (done)=>{
    request('localhost:3000')
    .get('/time')
    .end((err,res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res).to.have.header('content-type','text/html');
      expect(res.text < server.timeStamp()).to.be.true;
      done();
    });
  });
});
