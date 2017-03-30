// improvement on server3, saves the contents of each of the important files into js objects

var fs          = require('fs')
var path        = require('path')
var Finder      = require('fs-finder');
var xml2js      = require('xml2js');
var util        = require('util')
var js2xmlparser = require("js2xmlparser")

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

var jsonPlan;
var parser = new xml2js.Parser();
var builder = new xml2js.Builder();


var today = new Date()
var date  = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()

var planStructure = {
  PlanObject:{
    GenericInfo: {
      Type: 'UKR',
      Libraries: {
        Library: [
          {
            Name: "Tibia",
            LibrarySource: {
              '@':{
                'type': "Upload"
              },
              '#':{
                'text': "Tibia.stl"
              }
            }
          },
          {
            Name: "Femur",
            LibrarySource: {
              '@':{
                'type': "Upload"
              },
              '#':{
                'text': "Femur.stl"
              }
            }
          },
          {
            Name: "FemOx",
            LibrarySource: { "-type": "Read" }
          },
          {
            Name: "TibiaLatOxLeft",
            LibrarySource: { "-type": "Read" }
          },
          {
            Name: "LatOxBear",
            LibrarySource: { "-type": "Read" }
          }
        ]
      }
    },
    CaseDetails:{
      CaseID:'',
      Version: 1,
      Author: 'SGC',
      Date: date,
      Side: '',
      Condyle: ''
    }
  }
}

// console.log(planStructure)


// Create JS Object
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

  // transformIntoJSON
  function transformIntoJSON(data){
    return new Promise(function(resolve,reject){
      console.log('Side data: --> ', data.AcrobotObject.ImplantObject[0].Side[0])
      planStructure.PlanObject.CaseDetails.Side = data.AcrobotObject.ImplantObject[0].Side[0]
      console.log('Object pop --> ', planStructure)
      resolve(planStructure)
    })
  }

  function convert2XML(data){
    console.log('LOOK', data)
    return new Promise(function(resolve, reject){
      console.log('data to be converted: ', data)
      xml = js2xmlparser.parse("root", data)
      console.log('converted data: ', xml)
      resolve(xml)
    })
  }

  function writeXML(xml){
    return new Promise(function(resolve, reject){

      fs.writeFile('default_plan_1.xml', xml, function(err){
        resolve(console.log('file created! @ '))
      })
    })
  }

// tomorrow laod the required bits into variables and then build the new json object using another function, which will eb chained to the third promise.
// then convert that into the XML
// need to think about attributes of the MXL?


  getXML(planFile).then(function(data){
    transformIntoJSON(data)
  }).then(function(data1){
    // console.log('promise data:', data)
    convert2XML(data1)
  }).then(function(data){
    writeXML(data)
  })

    // .then(convert2XML)
    // .then(writeXML)


//  Convert to JSON









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
