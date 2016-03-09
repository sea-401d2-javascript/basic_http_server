var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var request = chai.request;
var expect = chai.expect;

require(__dirname + '/../lib/http.js');

describe('http.js', ()=> {
  it('should respond to a request to /time', (done)=>{
    request('localhost:3000').get('/time').end((err, res) => {
      var today = new Date();
      expect(res.status).to.equal(200);
      expect(res.text.slice(0, 18)).to.equal(today.toISOString().slice(0,18));
      done();  
    });  
  });
  it('should respond to a GET request to /greet/name that returns a response string', (done)=>{
    request('localhost:3000').get('/greet/Dave').end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.text).to.equal('Affirmative Dave, I read you.');
      done();  
    });
  });
  it('should respond to a POST request to /greet with a JSON object and return a response string', (done)=>{
    request('localhost:3000').post('/greet').send({name: 'Dave'}).end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.text).to.equal('Affirmative Dave, I read you.');
      done();
    });
  });
  it('should return a 404 error otherwise', (done)=>{
    request('localhost:3000').get('/404').end((err, res) => {
      expect(res.status).to.equal(404);
      expect(res.text).to.equal('I\'m sorry Dave, I\'m afraid I can\'t do that.');
      done();
    });
  });
  
});
