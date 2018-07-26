import React, { Component } from 'react';
import Charts from './charts';

class Form extends Component {

  constructor() {
    super();
    this.state = {
      text: ""
    }
    this.updateInfo = this.updateInfo.bind(this)
  }

  updateInfo(event){
    const searchQuery = event.target.value;
    this.setState({text: searchQuery})
  }

  render() {
    return(
      <div>
        <div>
          <h1>Paste your JSON</h1>
          <input onChange={this.updateInfo}/>
          <button>See the data in charts</button>
        </div>
        <Charts />
      </div>
    );
  
  }
}

export default Form;