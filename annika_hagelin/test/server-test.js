var chai = require('chai')
chai.use(require('chai-http'));

var request = chai.request;
var expect = chai.expect;

describe('server testing', () => {

  it('should get /time', (done) => {
    request('localhost:3000')
    .get('/time')
    .end((err, res) => {
      console.log('response received');
      expect(err).eql(null);
      expect(res).status(200);
      console.log(res.text);
      done();
    });
  });


});
