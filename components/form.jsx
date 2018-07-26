import React, { Component } from 'react';

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
        <h1>Enter your info</h1>
        <input onChange={this.updateInfo}/>
      </div>
    );
  
  }
}

export default Form;