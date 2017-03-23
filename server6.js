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
console.log("BASEDIR:", baseDir)

// find directory using input args
// var directory = path.join(Finder.in(baseDir).findDirectories('plan'+argv.c).toString());
// console.log('the planner directory address is: ', directory)

// // find plan file within the target planner directory
var planFile = path.join(Finder.from(baseDir).findFiles('planFile').toString());
console.log('1: plan file identified = '+planFile)

// // find the next file withing the target planner directory
var nextFile = path.join(Finder.from(baseDir).findFiles('next*').toString());
console.log('2: next file identified = '+nextFile)

// // find plan file within the target planner baseDir
// var xmlFile = path.join(Finder.from(baseDir).findFiles('default*').toString());
// console.log('*: default xml file identified = '+xmlFile)


// 1 Read the files then create an object
var jsonPlan;
var parser = new xml2js.Parser();

var builder = new xml2js.Builder();

function getJSON (planFile){
  return new Promise(function(resolve, reject){


  fs.readFile(planFile, 'UTF-8',function(err, data) {
      console.log("FILE CONTENT: ", planFile, " -> ", data)
      parser.parseString(data, function (err, result) {

          if(err){
            reject('couldn\'t find the file!' + err)
          }
          console.log("RESULT: ", planFile, " -> ", result)
          resolve(result) // this will have to be an array of objects passed in to the build XML builder because it will be reading multiple files

          // console.dir(result);
          // console.log('Done');
      });
    });
  })
}

function buildXML(jsonPlan){
  console.log(jsonPlan)
  var xml = builder.buildObject(jsonPlan);
  // console.log(xml)
}

function writeXML(xml){

    fs.writeFile('default_plan_' + argv.c + '.xml', xml, function(err){
      console.log('file created!')

  })
}




getJSON().then(function (data){
  // jsonPlan = data
  // console.log(jsonPlan.PlanObject.CaseDetails)
  return buildXML(data)
}, function (error){
  console.log(error)
}) // chain another promise to get the saveXML to correct planner folder!


// get the JSON then build the new XML with using the JSON files (there will be multple json files)

// buildXML by accessing key values and run function by chaining promises

























// read the file contents and write the file
// actually it would be better to save the data to a json object before beginning any of the write functions
// ************
// var contents = fs.readFile(planFile, 'UTF-8', function(err, contents){

//   if (err){

//     console.log(err)

//   }

//     fs.writeFile('default_plan_' + argv.c + '.xml', contents+'\n', function(err){
//       console.log('3: file created!')


//       var nextContents = fs.readFile(nextFile, 'UTF-8', function(err, contents){

//         if (err){

//           console.log(err)

//         }

//           fs.appendFile('default_plan_' + argv.c + '.xml', contents, function(err){
//             console.log('4: file appended!')

//         })

//         console.log('next file contents: '+contents)
//       })

//   })

//   console.log('plan file contents: '+contents)
// })





// append the next tags into the existing file
