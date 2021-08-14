function ConvertHandler() {
  
  this.getNum = function(input) {
    const regex1 = /.*\d+\W*/; //Primeste partea numerala
    const regex2 = /[^0-9./]+/g; //Verifica daca are altcv inafara de digit, slah, dot
    const regex3 = /[/]/g //Verifica daca are slash
    const regex4 = /^\d*\.?\d*$/g //Verifica daca e numar
    const regex5 = /^\d*\.?\d*[/]\d+\.?\d*$/ //Verifica daca sunt numere cu slash
    const regex6 = /[^/]+/g //Scoate numerele
    const regex7 = /\d+\.?\d*/ //Scoate numar

    if(!regex1.test(input)){
      return 1;
    }
    else{
      let numberPart = input.match(regex1)[0];

      if(regex2.test(numberPart)){ 
        return -1;
      }
      else{
        if(regex3.test(numberPart)){
          if(regex5.test(numberPart)){
            let [c1, c2] = numberPart.match(regex6);
            [c1, c2] = [Number(c1), Number(c2)]
            return c1/c2;
          }
          else{
            return -1;
          }
        }
        else
        {
          if(regex4.test(numberPart)){
            let [c1] = numberPart.match(regex7)
            c1 = Number(c1);
            return c1;
          }
          else{
            return -1;
          }
        }
      }
    }
  }
  
  this.getUnit = function(input) {
    const regex1 =  /[a-zA-Z]\w*/g
    const regex2 = /[^a-zA-Z]/

    let unit = input.match(regex1);
    unit = unit[unit.length - 1];
    
    if(regex2.test(unit))
      return -1;

    unit = unit.toLowerCase();

    if(unit === 'l')
      unit = 'L';

    return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit.toLowerCase())
    {
      case 'gal':
        return 'L';
      case 'l':
        return 'gal';
      case 'mi':
        return "km";
      case "km":
        return "mi";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      default:
        return -1;
    }
  };

  this.spellOutUnit = function(unit) {
    switch(unit.toLowerCase())
    {
      case 'gal':
        return 'gallons';
      case 'l':
        return 'liters';
      case 'mi':
        return "miles";
      case "km":
        return "kilometers";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      default:
        return "esti idiot";
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;

    switch(initUnit.toLowerCase())
    {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        return "esti idiot";
        break;
    }
    return Math.round( result * 100000 ) / 100000;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = String(initNum) + " " + this.spellOutUnit(initUnit) + " converts to " + String(returnNum) + " " + this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
