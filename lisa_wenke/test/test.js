'use strict';

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server');
var fs = require('fs')
var moment = require('moment');


describe('Get the time to pass in ', () => {
  var html;
  before((done) => {
    fs.readFile(__dirname + '/public/index.html', (err, data) => {
      html = data.toString();
      done();
    });
  });
  it('should respond to /greet with greet', (done) => {
    request('localhost:3000')
    .post('/')
    //node style callback
    .get('/greet/name')
    //check if there isn't an error
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body).to.eql({message: 'hello'});
      done();

    });
  });
  it('should send back an index page', (done) => {
    request('localhost:3000')
    .get('/')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql(html);
      done();
    });
  });
  it('should send back a 404 error', (done) => {
    request('localhost:3000')
    .get('/')
    .end((err,res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(404);
      expect(res.text).to.eql('404 Not Found');
      done();
    });
  });
});
