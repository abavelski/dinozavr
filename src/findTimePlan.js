
var weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
module.exports = function(timePlans, req) {
  var weekday = weekdays[req.chargeDate.getDay()];
  var plans;
  if (timePlans[weekday]) {
    plans = timePlans[weekday];
  } else if (timePlans.default){
    plans = timePlans.default;
  } else {
    plans = timePlans;
  }


  var filteredTimePlans = plans.filter(function(timePlan) {
    var hour = req.chargeDate.getHours();
    return timePlan.startHour <= hour && hour <= timePlan.endHour;
  });

  if (filteredTimePlans.length!==1) {
    return { err: "missing-time-plan" };
  } else {
    return filteredTimePlans[0];
  }
}
