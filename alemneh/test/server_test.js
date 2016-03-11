const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require('../server');
var fs = require('fs');

describe('Vanilla HTTP server tests', () => {
  var html;
  before((done) => {
    fs.readFile(__dirname + '/../public/index.html', (err, data) => {
      html = data.toString();
      done();
    });
  });
  describe('Request made to "/"', () => {
    it('should respond to / with a welcome html page', (done) => {
      request('localhost:3000')
        .get('/')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.text).to.eql(html);
          done();
        });
    });
  });
  describe('Request made to "/time"', () => {
    it('should respond to /time with current time', (done) => {
      request('localhost:3000')
        .get('/time')
        .end((err, res) => {
          var date = new Date();
          var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.text).to.equal(time);
          done();
        });
    });
  });
  describe('Request made to "/greet"', () => {
    it('should respond to /greet with a JSON object with a key "name"', (done) => {
      request('localhost:3000')
        .post('/greet')
        .send({name: 'alem'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          // console.log(res.text);

          expect(res.text).to.eql('alem');
          done();
        });
    });
  });
  describe('Request made to "/greet/:name"', () => {
    it('should respond to /greet/alem with a greeting to the name in the URL', (done) => {
      request('localhost:3000')
        .get('/greet/alem')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.text).to.eql('Hello alem, how are you?');
          done();
        });
    });
  });
});
