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
    request('localhost:300')
      .get('/time')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        dateFromServer = moment(res.text);
        expect(moment()).to.be.below(moment(dateFromServer).add(5, 'seconds'));
        done();
      });
  });
});
