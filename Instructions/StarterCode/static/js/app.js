// Initializes the page with a default plot 
// Note from becky when i finish my app.js copy it to bonus js so just incase my bponus doesn't work 
// Always Use Live server
// == same value does not have to be  same data type

// ********************
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
        // console.log(otuIds);
      });
    // Meta data into demographics
    var demoData = 0;
    var washData=[];
    var metaData=data.metadata;
    metaData.forEach(person => {
        if (person.id==value){
            var demographics = Object.entries(person);
            demoData = demographics[6][1];
            d3.select('#sample-metadata').selectAll('panel').data(demographics).enter().append('panel').text(info=>{
                return ` ${info[0]} : 
                ${info[1]}--`;
            });
        if (person.id==value){
          washData=person.wfreq;
        };
        console.log(washData);
    
        }
    // console.log(metaData);
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
    
    // // Guage 
    var guageData = [
      {
        type: "indicator",
        mode: "gauge+number+delta",
        value: washData,
        title: { text: "Srubs per week", font: { size: 24 } },
        delta: { reference: washData },
        gauge: {
          axis: { range: [null, washData], tickwidth: 2, tickcolor: "darkblue" },
          bar: { color: "darkblue" },
          bgcolor: "white",
          // borderwidth: 2,
          // bordercolor: "gray",
          steps: [
            { range: [0, 1], color: "#e9f6e8" },
            { range: [1, 2], color: "#d4eed1" },
            { range: [2, 3], color: "#bee5ba" },
            { range: [4, 5], color: "#a9dda3" },
            { range: [5, 6], color: "#93d48c" },
            { range: [6, 7], color: "#7dcb75" },
            { range: [7, 8], color: "#68c35e" },
            { range: [8, 9], color: "#52ba47" },
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 1,
            value: washData
          }
        }
      }
    ];
    
    var layout = {
      title: { text: "Belly Button Washing Frequency"},
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "lavender",
      font: { color: "darkblue", family: "Arial" }
    };
    
    Plotly.newPlot('gauge', guageData, layout);
    

    });
  };

// )};


init();

  