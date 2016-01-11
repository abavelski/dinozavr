'use strict';
let charge = require('./charge'),
    findTimePlan = require('./findTimePlan'),
    locationPlugins = require('./plugins/location');

function chargeNode(node, req) {
  if (node.charges) {
    return charge(node.charges, req);
  } else if (node.timePlans) {

    let timePlan = findTimePlan(node.timePlans, req);
    if (!timePlan.err) {
      return charge(timePlan.charges, req);
    }
    return timePlan.err;
  } else {
      return 'charges-not-defined';
  }
}

class Rating {

  rate(req, tp) {

    if (!tp) {
      return 'traffic-plan-not-defined';
    }
    if (!tp.node) {
      return 'traffic-plan-missing-root-node';
    }
    if (tp.locationPlugin) {
      let plugin = locationPlugins[tp.locationPlugin];
      let node = plugin.getNode(tp.node, req);
      if (node.err) {
        return node.err;
      }
      return chargeNode(node, req);

    } else {
        return chargeNode(tp.node, req);
    }
  }
}

module.exports = new Rating();
