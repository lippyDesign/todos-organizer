import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class LoggedOutNav extends Component {
    
    render() {
    return (
      <div>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="/">Home</a></li>
          <li><a href="/register">Register</a></li>
          <li><a href="/login">LogIn</a></li>
        </ul>
        <ul className={this.props.naviClass}>
          <li><a href="/" onClick={this.props.toggleSideBar}>Home</a><hr/></li>
          <li><a href="/register" onClick={this.props.toggleSideBar}>Register</a><hr/></li>
          <li><a href="/login" onClick={this.props.toggleSideBar}>LogIn</a><hr/></li>
        </ul>
        <div className="hamburgerMenuIcon"><a onClick={this.props.toggleSideBar} href="#" className="button-collapse right"><i className="fa fa-bars fa-lg" aria-hidden="true"></i></a></div>
      </div>
    );
  }
}