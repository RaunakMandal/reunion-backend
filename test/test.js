var assert = require('assert');
var request = require('supertest');
before(function (done) {
    // In our tests we use the test db
    process.env.NODE_ENV = 'test';
    done();
});
describe('POST /api/signup', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});