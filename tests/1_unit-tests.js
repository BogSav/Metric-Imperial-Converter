const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let handler = new ConvertHandler();

suite('Unit Tests', function(){
  let sigma = 0.00001;
  test('convertHandler should correctly read a whole number input', function () {
      assert.strictEqual(handler.getNum('12'), 12);
  });
  test('convertHandler should correctly read a decimal number input', function () {
      assert.approximately(handler.getNum('12.23'), 12.23, sigma);
  });
  test('convertHandler should correctly read a fractional input', function () {
      assert.approximately(handler.getNum('13/6'), 13/6, sigma);
  });
  test('convertHandler should correctly read a fractional input with a decimal', function () {
      assert.approximately(handler.getNum('12.3/12.6'), 12.3/12.6 , sigma);
  });
  test('convertHandler should correctly return an error on a double-fraction', function () {
      assert.equal(handler.getNum('3/2/1'), -1);
  });
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
      assert.strictEqual(handler.getNum(''), 1);
  });
  test('convertHandler should correctly read each valid input unit.', function () {
      assert.strictEqual(handler.getUnit('12l'), 'L');
      assert.strictEqual(handler.getUnit('12gAl'), 'gal');
      assert.strictEqual(handler.getUnit('12kM'), 'km');
      assert.strictEqual(handler.getUnit('12Mi'), 'mi');
      assert.strictEqual(handler.getUnit('12lBS'), 'lbs');
      assert.strictEqual(handler.getUnit('12Kg'), 'kg');
  });
  test('convertHandler should correctly return an error for an invalid input unit', function () {
      assert.strictEqual(handler.getReturnUnit(handler.getUnit('12.2laala')), -1);
  });
  test('convertHandler should return the correct return unit for each valid input unit', function () {
      assert.strictEqual(handler.getReturnUnit('l'), 'gal');
      assert.strictEqual(handler.getReturnUnit('gal'), 'L');
      assert.strictEqual(handler.getReturnUnit('mi'), 'km');
      assert.strictEqual(handler.getReturnUnit('km'), 'mi');
      assert.strictEqual(handler.getReturnUnit('kg'), 'lbs');
      assert.strictEqual(handler.getReturnUnit('lbs'), 'kg');
  });
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
      assert.strictEqual(handler.spellOutUnit('l'), 'liters');
      assert.strictEqual(handler.spellOutUnit('gal'), 'gallons');
      assert.strictEqual(handler.spellOutUnit('mi'), 'miles');
      assert.strictEqual(handler.spellOutUnit('km'), 'kilometers');
      assert.strictEqual(handler.spellOutUnit('kg'), 'kilograms');
      assert.strictEqual(handler.spellOutUnit('lbs'), 'pounds');
  });
  test('convertHandler should correctly convert gal to L', function () {
      assert.approximately(handler.convert(1, 'gal'), 3.78541, sigma);
  });
  test('convertHandler should correctly convert L to gal', function () {
      assert.approximately(handler.convert(1, 'L'), 0.26417, sigma);
  });
  test('convertHandler should correctly convert mi to km', function () {
      assert.approximately(handler.convert(1, 'mi'), 1.60934, sigma);
  });
  test('convertHandler should correctly convert km to mi', function () {
      assert.approximately(handler.convert(1, 'km'), 0.62137, sigma);
  });
  test('convertHandler should correctly convert lbs to kg', function () {
      assert.approximately(handler.convert(1, 'lbs'), 0.45359, sigma);
  });
  test('convertHandler should correctly convert kg to lbs', function () {
      assert.approximately(handler.convert(1, 'kg'), 2.20462, sigma);
  });
});