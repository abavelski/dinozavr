'use strict';

function parseNodes(location, destination, nodes) {
  nodes.push(location);
  let children = location.children;
  if (children) {
    children.forEach(function(child) {
      let subNumber = child.subNumber;
      if (destination.startsWith(subNumber)) {
        parseNodes(child, destination.substring(subNumber.length), nodes);
      }
    });
  }
}

class BestMatch {

  getNode(node, req) {
    if (!req.destination) {
      return {err: "missing-destination"};
    }
      let nodes = [];
      parseNodes(node, req.destination, nodes);
      return nodes.pop();
  }

}

module.exports = new BestMatch();
