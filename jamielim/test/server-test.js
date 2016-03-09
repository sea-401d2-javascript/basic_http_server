var chai = require("chai");
var chaiHTTP = require("chai-http");
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server');
var fs = require('fs');

describe("Vanilla HTTP server tests", () => {
  it("should respond to /time with date", (done) => {
    request('localhost:3000')
      .get('/time')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        done();
      })
  });

  it("should respond to /greet/joe with Hi Joe", (done) => {
    request('localhost:3000')
      .get('/greet/joe')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Hi Joe');
        done();
      })
  });

  it("should respond to /greet", (done) => {
    request('localhost:3000')
      .post('/greet')
      .send({'name': 'joe'})
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        done();
      })
  });

  it("should respond to /foo with 404 Not Found", (done) => {
    request('localhost:3000')
      .get('/foo')
      .end((err, res) => {
        expect(err).to.not.equal(null);
        expect(res).to.have.status(404);
        expect(res.text).to.equal("404 Not Found");
        done();
      })
  });
});