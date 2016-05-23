import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Accounts } from 'meteor/accounts-base';

import LoginForm from '../components/LoginForm.jsx';
import ForgotPasswordForm from '../components/ForgotPasswordForm.jsx'
import Header from '../components/Header.jsx';

export default class LoginPage extends Component {
  
  constructor() {
    super();
    this.state = {
      isSpinnerVisible: false,
      isPasswordResetFormVisible: false
    }
  }
  
  handleSignIn(event) {
    event.preventDefault();
    
    // Display Loading Spinner
        this.setState({
          isSpinnerVisible: true
        })
 
    // Find the text field via the React ref
    const email = ReactDOM.findDOMNode(this.refs.loginForm.refs.email).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.loginForm.refs.password).value.trim();
 
    // Login user
    Meteor.loginWithPassword(email, password, (er) => {
      
      if (er) {
        Materialize.toast(er.reason, 4000);
        // Hide Loading Spinner
        this.setState({
          isSpinnerVisible: false
        })
        
      } else {
        // redirect to dashboard page
        FlowRouter.go('/dashboard');
      }
    });
  }
  
  togglePasswordResetForm(event) {
    event.preventDefault();
    
    if (this.state.isPasswordResetFormVisible) {
      this.setState({
          isPasswordResetFormVisible: false
      })
    } else {
      this.setState({
          isPasswordResetFormVisible: true
      })
    }
  }
  
  resetPassword(event) {
    event.preventDefault();
    
    const emailForUsersPassword = ReactDOM.findDOMNode(this.refs.passwordForm.refs.emailForUsersPassword).value.trim();
    
    if (emailForUsersPassword !== "") {
        Accounts.forgotPassword({email: emailForUsersPassword}, (er) => {
        if (er) {
          Materialize.toast(er.reason, 4000);
        } else {
          Materialize.toast("We sent you an email with instructions on how to reset your password", 6000);
          ReactDOM.findDOMNode(this.refs.passwordForm.refs.emailForUsersPassword).value = '';
        }
      })
    } else {
      Materialize.toast("Please enter a valid email", 6000);
    }
  }
  
  loginFaceBookUser() {
    
  }
  
    
    render() {
      
      const spinnerVisibilityClass = this.state.isSpinnerVisible ? '' : 'isInvisible';
      const passwordResetForm = this.state.isPasswordResetFormVisible ? 'col l4 offset-l4 s12' : 'col l4 offset-l4 s12 isInvisible';
      
      return (
        <div className="container">
          <LoginForm logUserIn={this.handleSignIn.bind(this)} ref="loginForm" />
          <div className="row">
            <div className="col l4 offset-l4 s12">
              <hr/>
              <a className="right" href="#" onClick={this.togglePasswordResetForm.bind(this)}>forgot password?</a>
            </div>
            <div className={spinnerVisibilityClass}>
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw colorWhite"></i>
              <span className="sr-only colorWhite">Loading...</span>
            </div>
            <div className={passwordResetForm}>
              <ForgotPasswordForm ref="passwordForm" sendPassword={this.resetPassword.bind(this)}/>
            </div>
          </div>
        </div>
      );
  }
}