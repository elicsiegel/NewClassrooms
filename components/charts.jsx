import React, { Component } from 'react';

class Charts extends Component {

  constructor() {
    super();
    google.charts.load('current', {'packages':['corechart']});

    this.drawChart = this.drawChart.bind(this);
  }

  drawChart(columns, rows) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2]
    ]);

    // Set chart options
    var options = {'title':'How Much Pizza I Ate Last Night',
                   'width':400,
                   'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }

  render() {
    google.charts.setOnLoadCallback(this.drawChart);
    
    return(
      <div>
        Charts
        <div id="chart_div">
        </div>
      </div>
    );
  
  }
}

export default Charts;