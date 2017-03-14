// same approach but using the glob package

var glob = require("glob")

// // options is optional
// glob("**/*.js", options, function (er, files) {
//   // files is an array of filenames.
//   // If the `nonull` option is set, and nothing
//   // was found, then files is ["**/*.js"]
//   // er is an error object or null.
// })

var f = 'hello'

glob('../planner**/**', { ignore: '{c,d}/**' }, function(e,f) {
  console.log(f)
})