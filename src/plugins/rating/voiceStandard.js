'use strict';
class VoiceStandard {

  rate( units, rate) {
    if (units===0) {
            return 0;
        }
    var rest = units % 60;
    var minutes = Math.floor(units / 60);

  return rate*minutes+( (rest===0) ? 0 : rate);
  }

  description() {
    return 'Voice Standard';
  }

}

module.exports = new VoiceStandard();
