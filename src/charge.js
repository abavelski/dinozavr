var ratingPlugins = require('./plugins/rating');

module.exports = function(charges, req) {
  return charges.map(function(charge){
    var pl = ratingPlugins[charge.ratingPlugin];
    return {
        description : pl.description(),
        total : pl.rate(req.units, charge.rate)
    }
  });
}
