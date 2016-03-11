var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var expect = chai.expect;
var request = chai.request;
require(__dirname + '/../server');

describe('Test HTTP server',() => {
  it('should respond /time with current time', (done) =>{
    var now = new Date();

    request('localhost:3000')
      .get('/time')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res).to.eql(now);
        console.log(now);
        done();
      })
  })
  it('should respond to /greet/name with hello and that name', (done) => {
    var name = 'josh'
    request('localhost:3000')
      .get('/greet/' + name)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('hello, josh');
        done();
      })
  })

  it('should get back at 404 error', (done) => {
    request('localhost:3000')
      .get('/fakeURL')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.eql('404 Not Found');
        done();
      })
  })
})
