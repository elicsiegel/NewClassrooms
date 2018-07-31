import React, { Component } from 'react';
import Charts from './charts';

class Form extends Component {

  constructor() {
    super();
    this.state = {
      text: null
    }
    this.textInput = React.createRef();
    this.updateInfo = this.updateInfo.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }

  fileChangedHandler(e) {
    var that = this;
    var file = e.target.files[0]
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            var objOfFile = JSON.parse(evt.target.result);
            document.getElementById("data-entry").setAttribute("style", "display: none;");
            that.setState({text: objOfFile})
        }
        reader.onerror = function (evt) {
          that.setState({error: "couldn't upload"})
        }
    }
  }

  updateInfo(event){
    const searchQuery = JSON.parse(event.target.value);
    this.setState({text: searchQuery})
    
    document.getElementById("data-entry").setAttribute("style", "display: none;");
  }

  fetchUserData() {
    var that = this;
    var x = document.getElementById("myInput").value;
  
    $.ajax({
      url: 'https://randomuser.me/api/?results=' + x,
      dataType: 'json',
      success: function(data) {
        document.getElementById("data-entry").setAttribute("style", "display: none;");
        that.setState({
          text: data
        });
      }
    });

  }

  render() {
    console.log(this.state)
    return(
      <div>
        <div id="data-entry">
          <div className="title-div">
            <h1>Upload a JSON file containing random people</h1>
            <input type="file" name="file" id="file" className="inputfile" onChange={this.fileChangedHandler}/>
            <label htmlFor="file">Choose a file</label>
          </div>
          <p>or</p>
          <div className="title-div">
            <h1>Paste your JSON object into this input</h1>
            <input onChange={this.updateInfo}/>
          </div>
          <p>or</p>
          <div className="title-div">
            <h1>Enter the Number of Users you want to fetch randomly (max 5000)</h1>
            <p>Data pulled in from randomuser.me</p>
            <input placeholder="Num of Users" id="myInput"/>
            <button onClick={this.fetchUserData}>See the data in charts</button>
          </div>
        </div>
        <Charts data={this.state.text}/>
      </div>
    );
  
  }
}

export default Form;