// Initializes the page with a default plot 
// Note from becky when i finish my app.js copy it to bonus js so just incase my bponus doesn't work 
// Always Use Live server
// == same value does not have to be  same data type

// ********************
// Called in data and set data to drop down menue 
var dropdownMenu = d3.select("#selDataset");
d3.json("samples.json").then((data) => {
  console.log(data)
  var ID=data.names;
 // Assign the value of the dropdown menu option to be the name of the option
  ID.forEach(name => dropdownMenu.append('option').text(name).property('value',name));
  return data;
});

// to set up the data to change with the dropdownMenu  
function optionChanged(value){
  d3.json("samples.json").then((data) =>{
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
        title: { text: "Srubs per week", font: { size: 16 } },
        delta: { reference: washData },
        gauge: {
          axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue" },
          bgcolor: "white",
          steps: [
            { range: [0, .99], color: "#e8f2f6" },
            { range: [1, 1.99], color: "#d1e5ee" },
            { range: [2, 2.99], color: "#a3ccdd" },
            { range: [4, 4.99], color: "#8cbfd4" },
            { range: [5, 5.99], color: "#75b2cb" },
            { range: [6, 6.99], color: "#5ea5c3" },
            { range: [7, 7.99], color: "#4799ba" },
            { range: [8, 9], color: "#308cb2" },
          ],
          threshold: {
            line: { color: "red", width: 9 },
            thickness: 1,
            value: washData
          }
        }
      }
    ];
    
    var layout = {
      title: { text: "Belly Button Washing Frequency",font: { size: 18 } },
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "white",
      font: { color: "darkblue", family: "Arial" }
    };
    
    Plotly.newPlot('gauge', guageData, layout);
    

    });
  };



init();

  