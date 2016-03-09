'use strict';

const chai = require('chai');
const chai_http = require('chai-http');
chai.use(chai_http);
const request = chai.request;
const expect = chai.expect;

describe('HTTP Server Tests', () => {
  it('should respond to /time with current time', (done) => {
    request('localhost:3000')
      .get('/time')
      .end((err, res) => {
        if (err) throw err;
        var regex = new RegExp(/.+:.+:.+/);
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(regex.test(res.text)).to.eql(true);
        done();
      });
    done();
  });
});
