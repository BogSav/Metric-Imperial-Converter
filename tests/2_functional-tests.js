const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test("Convert a valid input", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=12L")
      .end(function (err, res) {
        assert.deepEqual(res.body, {
          "initNum":12,
          "initUnit":"L",
          "returnNum":3.17007,
          "returnUnit":"gal",
          "string":"12 liters converts to 3.17007 gallons"
          });
        done();
      });
  });
  test("Convert an invalid input", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end(function (err, res) {
        assert.strictEqual(res.text, 'invalid unit');
        done();
      });
    });
  test("Convert an invalid number", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end(function (err, res) {
        assert.strictEqual(res.text, 'invalid number');
        done();
      });
    });
  test("Convert an invalid number AND unit", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end(function (err, res) {
        assert.strictEqual(res.text, 'invalid number and unit');
        done();
      });
    });
  test("Convert with no number", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end(function (err, res) {
        assert.deepEqual(res.body, {
          "initNum":1,
          "initUnit":"kg",
          "returnNum":2.20462,
          "returnUnit":"lbs",
          "string":"1 kilograms converts to 2.20462 pounds"
          });
        done();
      });
    });
});
