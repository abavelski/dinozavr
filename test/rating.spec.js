var rating = require('../src/rating'),
  testPlans = require('./plans');

describe("Rating specs", function() {
  it("trafic plan is not specified", function() {

    expect(rating.rate({})).toEqual('traffic-plan-not-defined');
  });

  it ("root node in traffic plan is not specified", function() {
    var err = rating.rate({}, {});
    expect(err).toEqual('traffic-plan-missing-root-node');
  });

  it ("charges are not defined", function() {
    var err = rating.rate({}, { node: {} });
    expect(err).toEqual('charges-not-defined');
  });

  it("rate flat", function() {
    var rr = {
      chargeDate : new Date("January 1, 2015 12:00:00"),
      units : 5
    }

    var res = rating.rate(rr, testPlans.FLAT);
    expect(res.length).toEqual(2);
    expect(res[0]).toEqual({
        description: 'Initial',
        total: 0.49
      });
    expect(res[1].total).toEqual(0.19);
  });


  it ("missing time plan", function() {
    var rr = {
      chargeDate : new Date("January 1, 2015 16:40:00"),
      units : 5
    }
    expect(rating.rate(rr, testPlans.PEAK_TIME)).toEqual('missing-time-plan');
  });

  it ("peak time rating", function() {
    var rr = {
      chargeDate : new Date("January 1, 2015 20:25:00"),
      units : 65
    }

    var res = rating.rate(rr, testPlans.PEAK_TIME);
    expect(res.length).toEqual(2);
    expect(res[0]).toEqual({ description : 'Initial', total : 1.49 });
    expect(res[1]).toEqual({ description: 'Voice Standard', total: 0.58 });
  });

  it ("peak time rating with week days", function() {
    var rr = {
      chargeDate : new Date("January 4, 2015 20:25:00"),
      units : 65
    }

    var res = rating.rate(rr, testPlans.PEAK_TIME_WEEKDAYS);
    expect(res.length).toEqual(1);
    expect(res[0]).toEqual({ description: 'Voice Standard', total: 0.18 });
  });

  it ("peak time rating with week days and default days", function() {
    var rr = {
      chargeDate : new Date("January 1, 2015 20:25:00"),
      units : 65
    }

    var res = rating.rate(rr, testPlans.PEAK_TIME_WEEKDAYS);
    expect(res.length).toEqual(1);
    expect(res[0]).toEqual({ description: 'Voice Standard', total: 1.98 });
  });

  it ("location rating missing destination", function() {
    var rr = {
      chargeDate : new Date("January 1, 2015 20:25:00"),
      units : 65
    }
    var res = rating.rate(rr, testPlans.LOCATIONS);
    expect(res).toEqual('missing-destination')
  });

  it ("location rating", function() {
    var rr = {
      chargeDate : new Date("January 1, 2015 20:25:00"),
      units : 65,
      destination: '37323121931'
    }
    var res = rating.rate(rr, testPlans.LOCATIONS);
    console.log(res);
    //expect(res).toEqual('missing-destination')
  });




});
