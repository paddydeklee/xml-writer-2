module.exports = function(){

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
                '$':{
                  'type': "Upload"
                },
                '_':"Tibia.stl"
              }
            },
            {
              Name: "Femur",
              LibrarySource: {
                '$':{
                  'type': "Upload"
                },
                '_':"Femur.stl"
              }
            },
            {
              Name: "FemOx",
              LibrarySource: {
                '$':{
                  'type': "Read"
                }
              }
            },
            {
              Name: "TibiaLatOxLeft",
              LibrarySource: {
                '$':{
                  'type': "Red"
                }
              }
            },
            {
              Name: "LatOxBear",
              LibrarySource: {
                '$':{
                  'type': "Read"
                }
              }
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

  return planStructure
}
