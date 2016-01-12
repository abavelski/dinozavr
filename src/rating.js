'use strict';
let locationPlugins = require('./plugins/location'),
chargeNode = require('./chargeNode');

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
