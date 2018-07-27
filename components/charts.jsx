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

  divideByState() {
    const states = {};

    let idx = 0;

    while (idx < this.props.data.results.length -1) {
      const state = this.props.data.results[idx].location.state

      if (states[state]) {
        states[state] += 1;
      } else {
        states[state] = 1;
      }

      idx += 1;
    }

    var sortable = [];
    for (var vehicle in states) {
        sortable.push([vehicle, states[vehicle]]);
    }

    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });
   
    const topStates = sortable.reverse().slice(0, 10);

    return [topStates[0], topStates[1], topStates[2], topStates[3], topStates[4], topStates[5], topStates[6], topStates[7], topStates[8], topStates[9], "Division by State"];
  };

  percentOfFemalesinEachState() {
    const states = {};

    let idx = 0;

    while (idx < this.props.data.results.length -1) {
      if (this.props.data.results[idx].gender === "female") {
        const state = this.props.data.results[idx].location.state

        if (states[state]) {
          states[state] += 1;
        } else {
          states[state] = 1;
        }

      }
        idx += 1;
    }

      var sortable = [];
      for (var vehicle in states) {
          sortable.push([vehicle, states[vehicle]]);
      }

      sortable.sort(function(a, b) {
          return a[1] - b[1];
      });
     
      const topStates = sortable.reverse().slice(0, 10);

      // console.log(topStates)
      return [topStates[0], topStates[1], topStates[2], topStates[3], topStates[4], topStates[5], topStates[6], topStates[7], topStates[8], topStates[9], "Percent of Females in Top Ten States"];
  }

  percentOfMalesinEachState() {
    const states = {};

    let idx = 0;

    while (idx < this.props.data.results.length -1) {
      if (this.props.data.results[idx].gender === "male") {
        const state = this.props.data.results[idx].location.state

        if (states[state]) {
          states[state] += 1;
        } else {
          states[state] = 1;
        }

      }
        idx += 1;
    }

      var sortable = [];
      for (var vehicle in states) {
          sortable.push([vehicle, states[vehicle]]);
      }

      sortable.sort(function(a, b) {
          return a[1] - b[1];
      });
     
      const topStates = sortable.reverse().slice(0, 10);

      // console.log(topStates)
      return [topStates[0], topStates[1], topStates[2], topStates[3], topStates[4], topStates[5], topStates[6], topStates[7], topStates[8], topStates[9], "Percent of Males in Top Ten States"];
  }

  drawCharts() {
    const chartsToDraw = [];
    const beginningAlphabet = "abcdefghijklm".split("");
    const endingAlphabet = "nopqrstuvwxyz".split("");

    chartsToDraw.push(this.divideByGender());
    chartsToDraw.push(this.divideByFirstName(beginningAlphabet, endingAlphabet));
    chartsToDraw.push(this.divideByLastName(beginningAlphabet, endingAlphabet))
    chartsToDraw.push(this.divideByState())
    chartsToDraw.push(this.percentOfFemalesinEachState());
    chartsToDraw.push(this.percentOfMalesinEachState());
    chartsToDraw.push(this.divisionByAge());
    // this.divisionByAge();

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
    // debugger
    rowsToAdd.push(...rows)
    // debugger
    data.addRows(rowsToAdd);

    // Set chart options
    var options = {'title': title,
                   'width':800,
                   'height':500};

    // Instantiate and draw our chart, passing in some options.
    var chart_element = document.createElement("div");
    document.getElementById("charts_div").appendChild(chart_element);

    var chart = new google.visualization.PieChart(chart_element);
    chart.draw(data, options);
  }

  divisionByAge() {
    const ageRanges = {
      "0-20": 0,
      "21-40": 0,
      "41-60": 0,
      "61-80": 0,
      "81-100": 0,
      "100 +": 0
    };

    let idx = 0;

    while (idx < this.props.data.results.length -1) {
      const age = this.props.data.results[idx].dob.age

      if (age < 21) {
        ageRanges["0-20"] += 1;
      }
      if (age > 20 && age < 41) {
        ageRanges["21-40"] += 1;
      }
      if (age > 40 && age < 61) {
        ageRanges["41-60"] += 1;
      }
      if (age > 60 && age < 81) {
        ageRanges["61-80"] += 1;
      }
      if (age > 80 && age < 101) {
        ageRanges["81-100"] += 1;
      }
      if (age > 100) {
        ageRanges["100 +"] += 1;
      }

      idx += 1;
    }

    var sortable = [];
    for (var vehicle in ageRanges) {
        sortable.push([vehicle, ageRanges[vehicle]]);
    }

    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });
   
    const topStates = sortable.reverse().slice(0, 10);
    console.log(topStates)
    return [topStates[0], topStates[1], topStates[2], topStates[3], topStates[4], topStates[5], "Division by Age"];
  }

  render() {
    if (!this.props.data) return null;
    google.charts.setOnLoadCallback(this.drawCharts);
    
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