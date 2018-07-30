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

    while (idx <= this.props.data.results.length -1) {
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
   // debugger
    const topStates = sortable.reverse().slice(0, 10);

    var j = 10;
    const extraData = ["other", 0];

    while (j < sortable.length) {
      extraData[1] += 1;
      j += 1;
    }

    // debugger
    const finalArray = [extraData];

    var idx2 = 0

    while (idx2 < 10) {
      if (topStates[idx2]) {
        finalArray.push(topStates[idx2]);
      }
      idx2 += 1
    }
    finalArray.push("Population Distribution (only top 10 most populous states are highlighted, all others are included in other category")
    console.log(finalArray)
    return finalArray;
  };

  percentOfFemalesinEachState() {
    const states = {};

    let idx = 0;

    while (idx <= this.props.data.results.length -1) {
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

      var j = 10;
      const extraData = ["other", 0];

      while (j < sortable.length) {
        extraData[1] += 1;
        j += 1;
      }
      const finalArray = [extraData];
      var idx2 = 0

      while (idx2 < 10) {
        if (topStates[idx2]) {
          finalArray.push(topStates[idx2]);
        }
        idx2 += 1
      }

      finalArray.push("Female Population Distribution (only top 10 most populous states are highlighted, all others are included in other category")

      return finalArray;
  }

  percentOfMalesinEachState() {
    const states = {};

    let idx = 0;

    while (idx <= this.props.data.results.length -1) {
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

      var j = 10;
      const extraData = ["other", 0];

      while (j < sortable.length) {
        extraData[1] += 1;
        j += 1;
      }

      const finalArray = [extraData];
      var idx2 = 0

      while (idx2 < 10) {
        if (topStates[idx2]) {
          finalArray.push(topStates[idx2]);
        }
        idx2 += 1
      }
      finalArray.push("Male Population Distribution (only top 10 most populous states are highlighted, all others are included in other category")

      return finalArray;
      // console.log(topStates)
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

    var chart = new google.visualization.ColumnChart(chart_element);
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

    while (idx <= this.props.data.results.length -1) {
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
   
    const finalAges = sortable.reverse().slice(0, 10);
    
    return [finalAges[0], finalAges[1], finalAges[2], finalAges[3], finalAges[4], finalAges[5], "Division by Age"];
  }

  render() {
    if (!this.props.data) return null;
    google.charts.setOnLoadCallback(this.drawCharts);
    
    return(
      <div>
        
        <div id="charts_div">
          <div id="title_div">
            <h1>Charts</h1>
            <p>(refresh to enter a new data set)</p>
          </div>
        </div>
      </div>
    );
  
  }
}

export default Charts;