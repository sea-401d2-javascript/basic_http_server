var fs = require('fs');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var request = chai.request;
var expect = chai.expect;

require(__dirname + '/../server');

describe('vanilla HTTP server tests', () => {
  var html;
  before((done) => {
    fs.readFile(__dirname + '/../public/index.html', (err, data) => {
      html=data.toString();
      done();
    });
  });
  it('should respond to /time with time', (done) => {
    request('localhost:3000')
    .get('/time')
    .end((err,res)=> {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql(html);
      done();
    })
  })
  it('should respond to /greet/name with hello', (done) =>{
    request('localhost:3000')
    .get('/greet/mikleane')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('<h1>Hello, mikleane!</h1>');
      done();
    })
  })
});
