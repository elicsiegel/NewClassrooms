import React, { Component } from 'react';

class Charts extends Component {

  constructor() {
    super();
    google.charts.load('current', {'packages':['corechart']});

    this.drawCharts = this.drawCharts.bind(this);
    this.drawChart = this.drawChart.bind(this);
  }

  divideByGender() {
    const numMale = this.props.data.results.filter(person => person.gender === "male").length
    const numFemale = this.props.data.results.filter(person => person.gender === "female").length
    return [['Male', numMale], ["Female", numFemale], "Division By Gender"];
  }

  divideByFirstName(begin, ending) {

    const beginningName = this.props.data.results.filter(function(person) {
      if (person.name.first) {
        return begin.includes(person.name.first[0])
      }
      }).length

    const endingName = this.props.data.results.filter(function(person) {
      
      if (person.name.first) {
        return ending.includes(person.name.first[0])
      }
      }).length

    return [['Names beginning with A-M', beginningName], ["Names beginning with N-Z", endingName], "Division by First Name"]; 

  }

  divideByLastName(begin, ending) {
    const beginningLastName = this.props.data.results.filter(function(person) {
      if (person.name.last) {
        return begin.includes(person.name.last[0])
      }
      }).length

    const endingLastName = this.props.data.results.filter(function(person) {
      
      if (person.name.last) {
        return ending.includes(person.name.last[0])
      }
      }).length
    return [['Last names beginning with A-M', beginningLastName], ["Last names beginning with N-Z", endingLastName], "Division By Last Name"];
  }

  drawCharts() {
    const chartsToDraw = [];
    const beginningAlphabet = "abcdefghijklm".split("");
    const endingAlphabet = "nopqrstuvwxyz".split("");

    chartsToDraw.push(this.divideByGender());
    chartsToDraw.push(this.divideByFirstName(beginningAlphabet, endingAlphabet));
    chartsToDraw.push(this.divideByLastName(beginningAlphabet, endingAlphabet))
    

    
    for (var i = 0; i <= chartsToDraw.length - 1; i++) {
      const title = chartsToDraw[i].pop();
      this.drawChart(chartsToDraw[i], title);
    };
  }

  drawChart(rows, title) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Number');

    const rowsToAdd = []
    rowsToAdd.push(...rows)

    data.addRows(rowsToAdd);

    // Set chart options
    var options = {'title': title,
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