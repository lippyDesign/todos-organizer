import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import RegistrationForm from '../components/RegistrationForm.jsx'

export default class Register extends Component {
  
  constructor() {
    super();
    this.state = {
      isSpinnerVisible: false
    }
  }
    
  handleReg(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const firstName = ReactDOM.findDOMNode(this.refs.registrationForm.refs.firstName).value.trim();
    const lastName = ReactDOM.findDOMNode(this.refs.registrationForm.refs.lastName).value.trim();
    const email = ReactDOM.findDOMNode(this.refs.registrationForm.refs.email).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.registrationForm.refs.password).value.trim();
    const confirmPassword = ReactDOM.findDOMNode(this.refs.registrationForm.refs.confirmPassword).value.trim();
 
    if (password === confirmPassword && password !== "" && email !== "" && firstName !== "" && lastName !== "") {
      
            // Display Loading Spinner
            this.setState({
              isSpinnerVisible: true
            })
      
            var accountInfo = {
                email: email,
                password: password,
                profile: {
                  firstName: firstName,
                  lastName: lastName
                }
            }
            
            Accounts.createUser(accountInfo, function(err) {
                // if there was an error creating an account
                if (err) {
                    Materialize.toast(err.reason, 4000);
                } else {
                    // redirect to home page
                    FlowRouter.go('/');
                }
            });
            this.setState({
              isSpinnerVisible: false
            });
            
        } else {
            Materialize.toast('Passwords do not match or a field is empty', 4000);
        }
  }
    
  render() {
    
      const spinnerVisibilityClass = this.state.isSpinnerVisible ? '' : 'isInvisible';
      
      return (
        <div className="container">
          <RegistrationForm registerUser={this.handleReg.bind(this)} ref="registrationForm"/>
          <div className={spinnerVisibilityClass}>
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw theSpina colorWhite"></i>
              <span className="sr-only theSpina colorWhite">Loading...</span>
          </div>
        </div>
      );
  }
}