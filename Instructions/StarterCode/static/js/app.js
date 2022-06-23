// Initializes the page with a default plot 
// Note from becky when i finish my app.js copy it to bonus js so just incase my bponus doesn't work 
// Always Use Live server

// // Fetch the JSON data and console log it
// d3.json("../data/samples.json").then((data) => {
//   console.log(data);
// });
  


// Called in data and set data to drop down menue 
function init() {
  var dropdownMenu = d3.select("#selDataset");
  d3.json("../data/samples.json").then((data) => {
    console.log(data)
    var ID=data.names;
      // Assign the value of the dropdown menu option to be the name of the 
    ID.forEach(name => dropdownMenu.append('option').text(name).property('value',name))
    buildPlot(id[0]);
    demographic(id[0]);  
    });
  };

  // let dataset = dropdownMenu.property("value");  



  init();