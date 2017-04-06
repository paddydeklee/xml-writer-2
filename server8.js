// improvement on server3, saves the contents of each of the important files into js objects

var fs          = require('fs')
var path        = require('path')
var Finder      = require('fs-finder');
var xml2js      = require('xml2js');
var util        = require('util')
var planStructure = require('./planStructure')()


console.log(typeof js2xmlparser)

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
var planFile = path.resolve(Finder.from(baseDir).findFiles('planFile').toString());
var nextFile = path.join(Finder.from(baseDir).findFiles('next*').toString());
// var targetFile =

var jsonPlan;
var parser = new xml2js.Parser();
var builder = new xml2js.Builder({explicitCharkey: true});

// will need a function to copy the files to the server location
function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}


// FUNCTION 1
// Fetch the XML from the correct directory and transform into a JS object
  function getXML (planFile){

    return new Promise(function(resolve, reject){

    fs.readFile(planFile, 'UTF-8', function(err, data) {

        parser.parseString(data, function (err, result) {

            if(err){
              reject('couldn\'t find the file!' + err)
            }

            console.log("RESULT: ", planFile, " -> ", result)

            resolve(result) // push into array for builder to loop

              // console.dir(result.AcrobotObject.ImplantObject.Side);
              console.log('Done');
        });
      });
    })
  }

// FUNCTION 2
// Get details from the plan file and load into the default plan
  function transformIntoJSON(data){
    return new Promise(function(resolve,reject){
      console.log('Side data: --> ', data.AcrobotObject.ImplantObject[0].Side[0])
      planStructure.PlanObject.CaseDetails.Author = 'PDK'
      planStructure.PlanObject.CaseDetails.Side = data.AcrobotObject.ImplantObject[0].Side[0]
      resolve(planStructure)
    })
  }

// FUNCTION 3
// Convert the JS object into an XML
  function convert2XML(data){
    console.log(data)
    return new Promise(function(resolve, reject){
      var xml = builder.buildObject(data);
      console.log('converted data:', xml)
      resolve(xml)
    })
  }

// FUNCTION 4
// Write the XML to the correct location
  function writeXML(xml){
      fs.writeFile('default_plan_'+argv.c+'.xml', xml, function(err){
        if (err) throw err;
        console.log('The file has been saved!');
      });
    }



  getXML(planFile)
  .then(transformIntoJSON)
  .then(convert2XML)
  .then(writeXML)
  .catch('error')




// will need this to decrypt the relevant Files
  const execFile = require('child_process').execFile;
  const child = execFile('git', ['--version'], (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });

// then can run the file through the Function 1-4

// finally will need to adjust the functionality so that it loops through several files to build the JS object!






















  // function testBuildXML(jsonPlan){
  //   return new Promise(function(resolve, reject){
  //     console.log(jsonPlan)
  //       var xml = builder.buildObject(jsonPlan);
  //     console.log(xml)
  //   })
  // }

























// testBuildXML(planStructure)

//   function testWriter(){
//     fs.writeFile('message.txt', planStructure, (err) => {
//       if (err) throw err;
//       console.log('The file has been saved!');
//     });
//   }
//
// testWriter()
























// Promises example
//
// var firstMethod = function() {
//    var promise = new Promise(function(resolve, reject){
//       setTimeout(function() {
//          console.log('first method completed');
//          resolve({data: '123'});
//       }, 2000);
//    });
//    return promise;
// };
//
//
// var secondMethod = function(someStuff) {
//    var promise = new Promise(function(resolve, reject){
//       setTimeout(function() {
//          console.log('second method completed');
//          resolve({newData: someStuff.data + ' some more data'});
//       }, 2000);
//    });
//    return promise;
// };
//
// var thirdMethod = function(someStuff) {
//    var promise = new Promise(function(resolve, reject){
//       setTimeout(function() {
//          console.log('third method completed');
//          resolve({result: someStuff.newData});
//       }, 3000);
//    });
//    return promise;
// };
//
// firstMethod()
//    .then(secondMethod)
//    .then(thirdMethod);




// Selectively create a new XML



// Write XML






  // function writeXML(xml){
  //
  //     fs.writeFile('default_plan_' + argv.c + '.xml', xml, function(err){
  //       console.log('file created!')
  //
  //   })
  // }


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
