import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class RemoveUser extends Component {
  
  render() {
    
    return (
      <div className="row">
         <button onClick={this.props.deleteAccount} className="waves-effect red btn-large col s12 l4 offset-l4">Delete User Account</button> 
      </div>
    );
  }
}