'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
  app.route('/api/convert').get((req, res) => {
    let errorString = "";

    let initNum = convertHandler.getNum(req.query.input);

    if(initNum <= 0)
      errorString += "invalid number";

    let initUnit = convertHandler.getUnit(req.query.input);

    let returnUnit = convertHandler.getReturnUnit(initUnit);

    if(initUnit == -1 || returnUnit == -1)
      errorString += errorString == "" ? "invalid unit" : " and unit";

    if(errorString != "")
      return res.send(errorString);

    let returnNum = convertHandler.convert(initNum, initUnit);

    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
    return res.json({
      initNum: initNum, 
      initUnit : initUnit, 
      returnNum : returnNum, 
      returnUnit : returnUnit, 
      string : string 
      })
  });
};
