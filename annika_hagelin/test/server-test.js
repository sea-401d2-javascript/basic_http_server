var chai = require('chai')
chai.use(require('chai-http'));

var request = chai.request;
var expect = chai.expect;

describe('server testing', () => {

  it('should get /time', (done) => {
    request('localhost:3000')
    .get('/time')
    .end((err, res) => {
      console.log('response received from get /time');
      if (err) throw err;
      expect(res).status(200);
      console.log(res.text);
      done();
    });
  });

  it('should greet tad', (done) => {
    request('localhost:3000')
    .get('/greet/tad')
    .end((err, res) => {
      console.log('response received from get /greet/tad');
      expect(res).status(200);
      console.log(res.text);
      expect(res.text).eql('hello, tad');
      done();
    });
  });


});
