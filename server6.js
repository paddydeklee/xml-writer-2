// improvement on server3, saves the contents of each of the important files into js objects

var fs      = require('fs')
var path    = require('path')
var Finder  = require('fs-finder');
var xml2js  = require('xml2js');
var util    = require('util')

var argv    = require('yargs')
  .option('caseID', {
        alias: 'c',
        demand: true,
        description: 'the case ID to be converted to XML',
        type: 'string'
    }).help('help')
  .argv

// the directory where plans are kept
var baseDir = path.resolve('../planner/plan'+argv.c)
var planFile = path.join(Finder.from(baseDir).findFiles('planFile').toString());
var nextFile = path.join(Finder.from(baseDir).findFiles('next*').toString());

var jsonPlan;
var parser = new xml2js.Parser();
var builder = new xml2js.Builder();

fs.readFile(planFile, 'UTF-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

var parser = new xml2js.Parser();
