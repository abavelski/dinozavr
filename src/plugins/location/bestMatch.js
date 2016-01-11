'use strict';

function parseLocation(location, destination, visitedLocations) {
  visitedLocations.push(location);
  let children = location.children;
  if (children) {
    children.forEach(function(child) {
      let subNumber = child.subNumber;
      if (destination.startsWith(subNumber)) {
        parseLocation(child, destination.substring(subNumber.length), visitedLocations);
      }
    });
  }
}

class BestMatch {
  getTimePlans(node, request) {
      let visitedLocations = [];
      parseLocation(node, request.destination, visitedLocations);
      console.log(visitedLocations);
  }
}

module.exports = new BestMatch();
