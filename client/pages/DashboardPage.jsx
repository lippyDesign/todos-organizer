import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

import App from '../../imports/ui/App.jsx';

export default class DashboardPage extends Component {
  
  render() {
    
    return (
      <div className="container">
        <h5 className="colorWhite">Dashboard</h5>
        <h6 className="colorWhite">Let's get things done!</h6>
        <App/>
      </div>
    );
  }
}