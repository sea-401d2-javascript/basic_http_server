var chai = require('chai');
var chaiHTTP = require('chai-http');
var moment = require('moment');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server');
var dateFromServer = '';

describe('Testing vanilla HTTP server', () => {
  // var html;
  it('should respond to /time with the current time', (done) => {
    request('localhost:3000')
      .get('/time')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        dateFromServer = moment(res.text);
        expect(moment()).to.be.below(moment(dateFromServer).add(5, 'seconds'));
        done();
      });
  });
  it('should respond to /greet/name with greeting', (done) => {
    request('localhost:3000')
      .get('/greet/name')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello, name');
        done();
      });
  });
  it('should respond to /greet POST request', (done)=> {
    request('localhost:3000')
      .post('/greet')
      .set('Content-Type', 'application/json')
      .set('name', 'Fred')
      .send('{"name": "Fred"}')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello, Fred');
        done();
      });
  });
});
