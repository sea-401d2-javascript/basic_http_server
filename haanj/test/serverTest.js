'use strict';
require(__dirname + '/../server');

var fs = require('fs');
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;

describe('Vanilla HTTP server tests', () => {
  var html;
  before((done) => {
    fs.readFile(__dirname + '/../lib/index.html', (err, data) => {
      html = data.toString();
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
        expect(res.text.indexOf('<body>')).to.be.above(-1);
        done();
      });
  });
  it('should return the server\'s time', (done) => {
    request('localhost:3000')
      .get('/time')
      .end((err,res) => {
        let time = res.text;
        expect(err).to.eql(null);
        expect(time.indexOf('GMT')).to.be.above(-1);
        done();
      });
  });
  it('should return "Hello, name" with GET request', (done) => {
    request('localhost:3000')
      .get('/greet/name')
      .end((err,res) => {
        expect(err).to.eql(null);
        expect(res.text).to.eql('"Hello, name"');
        done();
      });
  });
  it('should return "Hello, boogers" with POST request', (done) => {
    request('localhost:3000')
    .post('/greet')
    .send({'name': 'boogers'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('"Hello, boogers"');
      done();
    });
  });

  it('should return the 404 page', (done) => {
    request('localhost:3000')
      .get('/404idj')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.equal('404 Not Found');
        done();
      });
  });
});
