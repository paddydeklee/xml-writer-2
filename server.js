// var express = require('express');
// var app = express();
// var PORT = process.env.PORT || 3000;
var fs = require('fs');
var argv = require('yargs')
  .option('caseID', {
        alias: 'c',
        demand: true,
        description: 'the case ID to be converted to XML',
        type: 'string'
    }).help('help')
  .argv

var plannerFolder;

// read folders in planner folder (could be better to be done sync) then check the folder does exist
var folders = fs.readdir('../planner', function(err, folders){

    if (err){
      throw err
    }

    console.log(folders)
    // take the arg caseID and use it to find the correct planner folder
    if (argv.c.length > 0) {

        console.log('case ID was provided: ' + argv.c)
        var caseID = argv.c;
        var matchedCase;

        var targetFolder;

        // read each folder within the planner folder and compare to the caseID given in args
        folders.forEach(function(folder){
          
          plannerFolder = parseInt(get_numbers(folder))
          if (plannerFolder === caseID){
            console.log('matching ' + plannerFolder + ' with ' + caseID)

            return callback(plannerFolder)

          }

        })

      
      } else {

        console.log('CaseID was not provided')
      }

  })

function callback(plannerFolder){
  console.log('callback has been called!')
  var folder = readdir('../planner/plan'+plannerFolder, function(err, folders) { 

    if (err){
      throw err
    }

    console.log(folder)
  })
}



console.log('..reading planner folders')

// get the planner folder numbers by ID
function get_numbers(input) {
    return input.match(/[0-9]+/g);
}














// app.listen(PORT, function() {
//   console.log('Express listening on port ' + PORT + '!')
// })