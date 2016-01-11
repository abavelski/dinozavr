'use strict';
class Initial {
  rate(units, rate) {
    return (units>0) ? rate : 0;
  };

  description() {
    return 'Initial';
  }

}

module.exports = new Initial();
