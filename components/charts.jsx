import React, { Component } from 'react';

class Charts extends Component {

  constructor() {
    super();
    google.charts.load('current', {'packages':['corechart']});

    this.drawCharts = this.drawCharts.bind(this);
    this.drawChart = this.drawChart.bind(this);
  }

  drawCharts() {
    const chartsToDraw = [];

    const numMale = this.props.data.results.filter(person => person.gender === "male").length
    const numFemale = this.props.data.results.filter(person => person.gender === "female").length
    chartsToDraw.push([['Male', numMale], ["Female", numFemale]]);

    const beginningAlphabet = "abcdefghijklm".split("");
    const endingAlphabet = "nopqrstuvwxyz".split("");

    const beginningName = this.props.data.results.filter(function(person) {
      // debugger
      if (person.name.first) {
        return beginningAlphabet.includes(person.name.first[0])
      }
      }).length

    const endingName = this.props.data.results.filter(function(person) {
      
      if (person.name.first) {
        return endingAlphabet.includes(person.name.first[0])
      }
      }).length
    chartsToDraw.push([['Names beginning with A-M', beginningName], ["Names beginning with N-Z", endingName]]);

    
    for (var i = 0; i <= chartsToDraw.length - 1; i++) {
      this.drawChart(chartsToDraw[i]);
    };
    // this.drawChart(chartsToDraw[0])
    
    // this.drawChart
    // const filtered = this.props.data.results.filter(person => person.gender === "female" && person.name.first.length  === person.name.last.length)
    // console.log(filtered)
  }

  drawChart(rows, title) {
    debugger
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Number');

    const rowsToAdd = []
    rowsToAdd.push(...rows)

    data.addRows(rowsToAdd);

    // Set chart options
    var options = {'title':'How Much Pizza I Ate Last Night',
                   'width':400,
                   'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart_element = document.createElement("div");
    document.getElementById("charts_div").appendChild(chart_element);

    var chart = new google.visualization.PieChart(chart_element);
    chart.draw(data, options);
  }

  render() {
    google.charts.setOnLoadCallback(this.drawCharts);
    // console.log(this.props.data.results.filter(person => person.gender === "male"))
    return(
      <div>
        <h1>Charts</h1>
        <div id="charts_div">
        </div>
      </div>
    );
  
  }
}

export default Charts;