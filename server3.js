// using the finder module

var fs      = require('fs')
var path    = require('path')
var Finder  = require('fs-finder');

var argv    = require('yargs')
  .option('caseID', {
        alias: 'c',
        demand: true,
        description: 'the case ID to be converted to XML',
        type: 'string'
    }).help('help')
  .argv

baseDir = '../planner'

// may need path.join method to ensure 

// filter folder using arguments
var directory = path.join(Finder.in(baseDir).findDirectories('plan'+argv.c).toString());
// console.log(directory)

// find file within the target planner folder
var planFile = path.join(Finder.from(directory).findFiles('planFile.txt').toString());
console.log('1: plan file identified = '+planFile)

var nextFile = path.join(Finder.from(directory).findFiles('next*').toString());
console.log('2: next file identified = '+nextFile)



// push the files into an array?
// var files = []
// files.push(nextFile, planFile)
// console.log(files)

// read the file contents and write the file
// actually it would be better to save the data to a json object before beginning any of the write functions
var contents = fs.readFile(planFile, 'UTF-8', function(err, contents){
  
  if (err){

    console.log(err)

  }

    fs.writeFile('default_plan_' + argv.c + '.xml', contents+'\n', function(err){
      console.log('3: file created!')


      var nextContents = fs.readFile(nextFile, 'UTF-8', function(err, contents){
        
        if (err){

          console.log(err)

        }

          fs.appendFile('default_plan_' + argv.c + '.xml', contents, function(err){
            console.log('4: file appended!')

        })

        console.log('next file contents: '+contents)
      })

  })

  console.log('plan file contents: '+contents)
})





// append the next tags into the existing file

