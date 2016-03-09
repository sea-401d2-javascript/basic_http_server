var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server');
var fs = require('fs');

describe('Vanilla HTTP server tests', () => {
  var html;
  before((done) => {
    fs.readFile(__dirname + '/../public/index.html', (err, data){
      html = data.toString();
      done();
    })
  })
  it('should respond to /hello with hello', (done) => {
    request('localhost:3000')
      .get('/hello')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.eql({message: 'hello'});
        done();
      })
  })
  it('should return "Hello, Brandon" with POST request', (done) => {
    request('localhost:3000')
    .post('/greet')
    .send({'name': 'Brandon'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('"Hello, Brandon"');
      done();
    });
  });
})
