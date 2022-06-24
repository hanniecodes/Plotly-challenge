// Initializes the page with a default plot 
// Note from becky when i finish my app.js copy it to bonus js so just incase my bponus doesn't work 
// Always Use Live server

// // Fetch the JSON data and console log it
// d3.json("../data/samples.json").then((data) => {
//   console.log(data);
// });
  


// Called in data and set data to drop down menue 
var dropdownMenu = d3.select("#selDataset");
d3.json("../data/samples.json").then((data) => {
  console.log(data)
  var ID=data.names;
 // Assign the value of the dropdown menu option to be the name of the option
  ID.forEach(name => dropdownMenu.append('option').text(name).property('value',name));
  return data;
});

// to set up the data to change with the dropdownMenu  
function optionChanged(value){
  d3.json("../data/samples.json").then((data) =>{
    // put all samples in variable
    var samplevals = data.samples;
    // make empty lists
    var sample_values = [];
    var otu_ids = [];
    var otu_labels = [];
    var otu_newlabel=[];
    // loop for sample vals
    samplevals.forEach(sample=>{
      if (sample.id===value){
        sample_values=sample.sample_values;
        otu_ids=sample.otu_ids;
        otu_labels=sample.otu_labels;
        otu_ids.map(otu_id=>{otu_newlabel.push(`OTU ${otu_id}`)})
      }
    })
  }
)};






  // let dataset = dropdownMenu.property("value");  



  init();