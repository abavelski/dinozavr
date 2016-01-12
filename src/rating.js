'use strict';
let bestMatch = require('./bestMatch'),
    chargeNode = require('./chargeNode');

class Rating {

  rate(req, tp) {

    if (!tp) {
      return 'traffic-plan-not-defined';
    }
    if (!tp.node) {
      return 'traffic-plan-missing-root-node';
    }
    if (tp.node.children) {
      let node = bestMatch.getNode(tp.node, req);
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
