var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server.js');
var fs = require('fs');

describe('http server tests', () => {
  it('should respond to /time with a date/time', (done) => {
    request('localhost:3000')
    .get('/time')
    .end((err, res) => {
      // expect(res).to.have.status(200);
      expect(res.text).to.equal(Date());
      done();
    });
  });
  it('should return 404 when an incorrect path is entered', (done) => {
    request('localhost:3000')
    .get('/ewersdfaf')
    .end((err,res) => {
      expect(res).to.have.status(404);
      done();
    });
  });
});
it('should return "Thom, hello. I see you there." with POST request', (done) => {
    request('localhost:3000')
    .post('/greet')
    .send({'name': 'Thom'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('{"name":"Thom"}');
      done();
    });
  });
