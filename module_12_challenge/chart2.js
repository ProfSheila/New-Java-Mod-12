function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
   
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
     var sampleNames = data.names;
   
    sampleNames.forEach((sample) => {
    selector
    .append("option")
    .text(sample)
    .property("value", sample);
    });
   
    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    });
    }
   
   // Initialize the dashboard
   init();
   
   function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    
   }
   // Demographics Panel 
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
     
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");
   
    // Use `.html("") to clear any existing metadata
    PANEL.html("");
   
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
    PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
   
    });
   }
//1. Create the buildCharts function.
   function buildCharts(sample) 
   {   
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
        console.log(data);

    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;

 // 4. Create a variable that filters the samples for the object with the desired sample number.
 var resultArray = samples.filter(sampleObj => sampleObj.id == sample);

 //var metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
 //var metadata = metadataArray[0];


  //  5. Create a variable that holds the first sample in the array.
  var result = resultArray[0];

   // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
   var otu_ids = result.otu_ids;
   var otu_labels = result.otu_labels;
   var sample_values = result.sample_values;
 
 // 7. Create the yticks for the bar chart.
 var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

   // 8. Create the trace for the bar chart. 
   var barData = [{
    y: yticks,
    x: sample_values.slice(0, 10).reverse(),
    text: otu_labels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h",
    }]
  
      // 9. Create the layout for the bar chart. 
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
        };

 // 10. Use Plotly to plot the data with the layout. 
 Plotly.newPlot("bar", barData, barLayout);
})


// Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {

    // Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
      
  
    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
      Plotly.newPlot(); 
  
    // 1. Create the trace for the bubble chart.
    var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
          }
        }
      ];
  
  // 2. Create the layout for the bubble chart.
      var bubbleLayout = {
        
        title: "Bacteria Cultures Per Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
      };
    //  var data = [trace1];
     // var layout = {
      //  margin: { t: 0 },
      //  xaxis: { title: "OTU ID" },
     //   hovermode: "closest",
      //  width: window.width,
     // };
  
  // 3. Use Plotly to plot the data with the layout.
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);

  //    Plotly.newPlot(); 

  
var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 11, 12, 13],
    text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
    mode: 'markers',
    marker: {
      color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
      size: [40, 60, 80, 100]
    }
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'Bubble Chart Hover Text',
    showlegend: false,
    height: 600,
    width: 600
  };
  
  //Plotly.newPlot('myDiv', data, layout);
//

//finish extra



//   //Guage
//   // Create the buildChart function.
//   function buildCharts(sample) {
  
//     var guageData = [
//       {
  
  
  
//   // Use d3.json to load the samples.json file 
//     d3.json("samples.json").then(data) => {
//       console.log(data);
    
  
//   // Create a variable that holds the samples array. 
//           domain: { x: [0, 5], y: [0, 1] },
//           value: subject.wfreq,
//           text: subject.wfreq,
//           type: "indicator",
//           mode: "gauge+number",
//           delta: { reference: 10 },
//           gauge: {
//             axis: { range: [null, 9] },
//             steps: [
//               { range: [0, 1], color: "rgb(248, 243, 236)" },
//               { range: [1, 2], color: "rgb(239, 234, 220)" },
//               { range: [2, 3], color: "rgb(230, 225, 205)" },
//               { range: [3, 4], color: "rgb(218, 217, 190)" },
//               { range: [4, 5], color: "rgb(204, 209, 176)" },
//               { range: [5, 6], color: "rgb(189, 202, 164)" },
//               { range: [6, 7], color: "rgb(172, 195, 153)" },
//               { range: [7, 8], color: "rgb(153, 188, 144)" },
//               { range: [8, 9], color: "rgb(132, 181, 137)" },
//             ],
//           },
//         },
//       ];
  
//       var layout = {
//         title: "<b>Belly Button Washing Frequency</b> <br>Scrubs Per Week</br>",
//         width: 350,
//         height: 350,
//         margin: { t: 50, r: 25, l: 25, b: 25 },
//       };
//       Plotly.newPlot("gauge", guageData, layout);
//     });
//   }
  
  // Create a variable that filters the samples for the object with the desired sample number.
  
  // 1. Create a variable that filters the metadata array for the object with the desired sample number.
  
  // Create a variable that holds the first sample in the array.
    
  
  // 2. Create a variable that holds the first sample in the metadata array.
      
  
  // Create variables that hold the otu_ids, otu_labels, and sample_values.
  
   // 3. Create a variable that holds the washing frequency.
     
  // Create the yticks for the bar chart.
  
  // Use Plotly to plot the bar data and layout.
    //   Plotly.newPlot();
      
//   // Use Plotly to plot the bubble data and layout.
//       Plotly.newPlot();
     
      
//   // 4. Create the trace for the gauge chart.
//       var gaugeData = [
       
//       ];
      
//   // 5. Create the layout for the gauge chart.
//       var gaugeLayout = { 
       
//       };
  
// //   // 6. Use Plotly to plot the gauge data and layout.
// //       Plotly.newPlot();
