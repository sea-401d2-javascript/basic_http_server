'use strict';

var chai = require('chai');
var chaiHTTP = require('chai-http');
var fs = require('fs');
chai.use(chaiHTTP);
var request = chai.request;
var expect = chai.expect;

require(__dirname + '/../http.js');

describe('vanilla http server tests', () => {
  it('should respond to /time with time', (done) => {
    request('localhost:3000')
      .get('/time')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).have.status(200);
        expect(typeof res.body).to.eql('object');
        expect(res.body).to.eql({message: 'Hello World'});
        done();
      })
  })
  it('should send back index page', (done) => {
    request('localhost:3000')
      .get('/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).have.status(200);
        expect(res.text).to.eql(html);
        done();
      })
  })
  it('should get back a 404', (done) => {
    request('localhost:3000')
      .get('/404')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(404);
        done();
      })
  })
})
