var chai = require('chai');
chai.use(require('chai-http'));

var request = chai.request;
var expect = chai.expect;

require(__dirname + '/../server.js');

describe('server testing', () => {

  it('should get /time', (done) => {
    request('localhost:3000')
    .get('/time')
    .end((err, res) => {
      if (err) throw err;
      console.log('response received from get /time');
      expect(res).status(200);
      console.log(res.text);
      done();
    });
  });

  it('should greet tad', (done) => {
    request('localhost:3000')
    .get('/greet/tad')
    .end((err, res) => {
      if (err) throw err;
      console.log('response received from get /greet/tad');
      expect(res).status(200);
      console.log(res.text);
      expect(res.text).eql('hello, tad');
      done();
    });
  });

  it('shoud post {name:"tad"} to /greet/tad', (done) => {
    request('localhost:3000')
    .post('/greet/tad')
    .end((err, res) => {
      if (err) throw err;
      console.log('response received from post /greet/tad');
      expect(res).status(200);
      expect(res.body).eql({name:'tad'});
      console.log(res.body);
      done();
    });
  });


});
