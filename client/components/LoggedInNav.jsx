import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class LoggedInNav extends Component {

    render() {
        
    return (
        <div>
           <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/settings">Settings</a></li>
                <li><a onClick={this.props.logout}>Logout</a></li>
            </ul>
            <ul className={this.props.naviClass}>
                <li><a href="/" onClick={this.props.toggleSideBar}>Home</a><hr/></li>
                <li><a href="/dashboard" onClick={this.props.toggleSideBar}>Dashboard</a><hr/></li>
                <li><a href="/settings" onClick={this.props.toggleSideBar}>Settings</a><hr/></li>
                <li><a onClick={this.props.logout}>Logout</a></li>
            </ul>
            <div className="hamburgerMenuIcon"><a onClick={this.props.toggleSideBar} href="#" className="button-collapse right"><i className="fa fa-bars fa-lg" aria-hidden="true"></i></a></div>
        </div>
        );
    }
}