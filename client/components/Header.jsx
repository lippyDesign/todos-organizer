import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import LoggedInNav from './LoggedInNav.jsx';
import LoggedOutNav from './LoggedOutNav.jsx';

export default class Header extends Component {
  constructor() {
    super();
    if (Meteor.userId() != null) {
      this.state = {
        isLoggedIn: true,
        isSideBarVisible: false
      }
    } else {
      this.state = {
        isLoggedIn: false,
        isSideBarVisible: false
      }
    }
  }
  
  logout() {
    Meteor.logout( function(er) {
      if (er) {
        Materialize.toast(er.reason, 4000);
      } else {
        FlowRouter.go('/');
        this.setState({
          isLoggedIn: !this.state.isLoggedIn,
          isSideBarVisible: false
        });
      }
    }.bind(this));
  }
  
  showHideSideNav() {
        
        if (this.state.isSideBarVisible === false) {
            this.setState({
                isSideBarVisible: true
            });
        } else {
            this.setState({
                isSideBarVisible: false
            });
        }
        
    }
  
  render() {
    
    const navClassName = this.state.isSideBarVisible ? 'mobileNavi blue darken-2  side-nav' : 'blue darken-2 side-nav';
    var navOptions = this.state.isLoggedIn ? <LoggedInNav logout={this.logout.bind(this)} toggleSideBar={this.showHideSideNav.bind(this)} naviClass={navClassName}/> : <LoggedOutNav toggleSideBar={this.showHideSideNav.bind(this)} naviClass={navClassName}/>;
    
    return (
      <div>
        <nav className=" blue darken-2">
          <div className="nav-wrapper row">
            <a href="/" className="brand-logo col offset-l1">Todos Organizer</a>
            {navOptions}
          </div>
        </nav>
      </div>
    );
  }
}