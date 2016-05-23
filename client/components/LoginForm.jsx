import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class LoginForm extends Component {
    
    render() {
    return (
      <div className="row">
        <div className="col s12 l4 offset-l4">
        <h4 className="colorWhite">Login</h4>
        <form className=" inputForm" onSubmit={this.props.logUserIn}>
            <div className="row">
                <div className="input-field">
                    <input id="email" type="email" className="validate" ref="email"/>
                    <label htmlFor="email">Email</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field">
                    <input id="password" type="password" className="validate" ref="password"/>
                    <label htmlFor="password">Password</label>
                </div>
            </div>
            <div className="row">
                <button className="waves-effect waves-light btn-large col s12">Login</button>
            </div>
        </form>
       </div>
      </div>
    );
  }
}