var yaml = require('js-yaml');
var fs   = require('fs');

module.exports = {
  LOCATIONS : yaml.safeLoad(fs.readFileSync(__dirname+'/locations.yaml', 'utf8')),
  FLAT : yaml.safeLoad(fs.readFileSync(__dirname+'/flat.yaml', 'utf8')),
  PEAK_TIME : yaml.safeLoad(fs.readFileSync(__dirname+'/peakTime.yaml', 'utf8')),
  PEAK_TIME_WEEKDAYS : yaml.safeLoad(fs.readFileSync(__dirname+'/peakTimeWithWeekdays.yaml', 'utf8'))
}
