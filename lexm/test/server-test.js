var chai = require('chai');
var chaiHTTP = require('chai-http');
var moment = require('moment');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server');
var dateFromServer = '';

describe('Testing vanilla HTTP server', () => {
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
  it('should respond to /greet/name with greeting', () => {
    request('localhost:3000')
      .get('/greet/name')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello, name');
      });
  });
  it('should respond to /greet by accepting name as JSON and greeting', ()=> {
    request('localhost:3000')
      .put('/greet')
      .set('name', 'Fred')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello, Fred');
      });
  });
});
