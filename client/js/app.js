pretifyInput = function(pType, pVal){

  value = null;

  switch (pType) {
    case 'number':
      value = function(){
          float = parseFloat(pVal.replace(',','.'))
          return float.toFixed(2)/1
      }
      break;
    case 'date':
      value = new Date(pVal)
      break;
    default:
      value = pVal
  }

  return value

}
