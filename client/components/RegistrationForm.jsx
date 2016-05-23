import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class RegistrationForm extends Component {
    
    render() {
    return (
      <div>
        <div>
        <h4 className="colorWhite">Be Cool and Sign Up</h4>
        <form className="inputForm col s12" onSubmit={this.props.registerUser}>
            <div className="row">
                <div className="input-field col s12 l6">
                    <input id="firstName" type="text" className="validate" ref="firstName"/>
                    <label htmlFor="firstName">First Name</label>
                </div>
                <div className="input-field col s12 l6">
                    <input id="lastName" type="text" className="validate" ref="lastName"/>
                    <label htmlFor="lastName">Last Name</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input id="email" type="email" className="validate" ref="email"/>
                    <label htmlFor="email">Email</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12 l6">
                    <input id="password" type="password" className="validate" ref="password"/>
                    <label htmlFor="password">Password</label>
                </div>
                <div className="input-field col s12 l6">
                    <input id="confirmPassword" type="password" className="validate" ref="confirmPassword"/>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
            </div>
            <div className="row">
                <button className="waves-effect waves-light btn-large col s12 l4 offset-l4">Register</button>
            </div>
        </form>
       </div>
      </div>
    );
  }
}


