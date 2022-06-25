// Initializes the page with a default plot 
// Note from becky when i finish my app.js copy it to bonus js so just incase my bponus doesn't work 
// Always Use Live server

// ********************
// Called in data and set data to drop down menue 
// ********************
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
    var sample_vals = data.samples;
    // make empty lists
    var sampleValues = [];
    var otuIds = [];
    var otuLabels = [];
    var otuNewlabel=[];
    var topTenlabels=[]
    // loop for sample vals
    sample_vals.forEach(sample=>{
      if (sample.id===value){
        sampleValues=sample.sample_values;
        otuIds=sample.otu_ids;
        otuLabels=sample.otu_labels;
        otuIds.map(otu_id=>{
          otuNewlabel.push(`OTU ${otu_id}`);
        });}; 

      });
 
    // Build Bubble layout
    var bubbleTrace={
      x: otuIds,
      y:sampleValues,
      mode:'markers',
      marker:{
        color:otuIds,
        size:sampleValues,
      }
    };
    var bubbleLayout ={
      title:"OTU ID",
      hovermode:'closest',
      showlegend: false,
    };

    Plotly.newPlot('bubble',[bubbleTrace],[bubbleLayout]);

    var barTrace={
      type:'bar',
      text : otuNewlabel.slice(0,10).reverse(),
      // both x and y are going to be slices of my values and my ids and a .reverse to swap the order.  
      x : sampleValues.slice(0,10).reverse(),
      y : otuIds.slice(0,10).map(otuId => `OTU ${otuId}`).reverse(),
      orientation:'h'
    };
    var barLayout ={
      title:{
        text:'Top 10 OTU',
        font:{
          size:25,
          color:'black'
        },
      },
      showlegend: false,
      height: 600,
      width: 650,
    };
    Plotly.newPlot('bar',[barTrace],[barLayout]);

    

    });
  };

// )};


init();

  