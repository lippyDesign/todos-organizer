import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class HomePage extends Component {
  
  render() {
    
    return (
      <div className="container">
        <h4 className="colorWhite">Lipi Todos Organizer</h4>
        <h5 className="colorWhite">Simple todos organizer, based on the example provided by meteor.com</h5>
        <h6 className="colorWhite">This project contains React JS and Meteor JS. It is hosted on Galaxy servers. The database is hosted on mLab servers.</h6>   
        <h6 className="colorWhite">Some of the functions are: register/login/forgot password, change password, delete account, add/remove tasks, task privacy, FlowRouter (with access validation).</h6>
      </div>
    );
  }
}