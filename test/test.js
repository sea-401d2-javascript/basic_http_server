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
      expect(typeof res.body).to.equal(Date());
      done();
    });
  });
  it('should return 404 when an incorrect path is entered', (done) => {
    request('localhost:3000').get('ewersdfaf').end((err, res) => {
      expect(res.status).to.equal(404);
      done();
    });
  });
  it('should return name hello. I see you there when accessing greet/name', (done) => {
    request('localhost:3000')
    .get('greet/name')
    .end((err, res) => {
      expect(res).to.equal('name, hello. I see you there.');
      done();
    })
  })
});
