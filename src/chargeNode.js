
var charge = require('./charge'),
    findTimePlan = require('./findTimePlan');

module.exports = function (node, req) {
  if (node.charges) {
    return charge(node.charges, req);
  } else if (node.timePlans) {

    var timePlan = findTimePlan(node.timePlans, req);
    if (!timePlan.err) {
      return charge(timePlan.charges, req);
    }

  return timePlan.err;
  } else {
    return 'charges-not-defined';
  }
};
