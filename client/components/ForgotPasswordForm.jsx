import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ForgotPasswordForm extends Component {
  
  render() {
    
    return (
      <div className="row inputForm">
         <form className="col s12" onSubmit={this.props.sendPassword}>
            <div className="row">
                <div className="input-field col s12">
                    <input id="emailForUsersPassword" type="email" className="validate" ref="emailForUsersPassword"/>
                    <label htmlFor="emailForUsersPassword">Email</label>
                </div>
                <button className="waves-effect blue darken-2 btn col s3 offset-s9"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
            </div>
        </form>   
      </div>
    );
  }
}