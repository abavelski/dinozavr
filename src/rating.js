'use strict';
let charge = require('./charge'),
    findTimePlan = require('./findTimePlan'),
    locationPlugins = require('./plugins/location');

class Rating {

  rate(req, tp) {

    if (!tp) {
      return 'traffic-plan-not-defined';
    }
    if (!tp.node) {
      return 'traffic-plan-missing-root-node';
    }
    if (tp.node.charges) {
      return charge(tp.node.charges, req);
    } else if (tp.locationPlugin) {
      let plugin = locationPlugins[locationPlugin];
      let timePlans = plugin.getTimePlans(tp.node, req);
      let timePlan = findTimePlan(timePlans, req);
      if (!timePlan.err) {
        return charge(timePlan.charges, req);
      }
      return timePlan.err;

    } else if (tp.node.timePlans) {

      let timePlan = findTimePlan(tp.node.timePlans, req);
      if (!timePlan.err) {
        return charge(timePlan.charges, req);
      }
      return timePlan.err;
    } else {
        return 'charges-not-defined';
    }
  }
}



module.exports = new Rating();
