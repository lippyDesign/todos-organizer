import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from './layouts/MainLayout.jsx';
import {SecondaryLayout} from './layouts/SecondaryLayout.jsx';

import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

FlowRouter.route("/", {
  action() {
    mount(MainLayout, {
        content: (<HomePage/>)
    });
  }
});
FlowRouter.route('/login', {
    action() {
        Tracker.autorun(function() {
            if (!Meteor.userId()) {
                mount(SecondaryLayout, {
                content: (<LoginPage/>)
                });
            } else {
              FlowRouter.go('/dashboard');
            }
        });
      }
});
FlowRouter.route('/register', {
    action() {
        Tracker.autorun(function() {
            if (!Meteor.userId()) {
                mount(SecondaryLayout, {
                content: (<RegisterPage/>)
                });
            } else {
              FlowRouter.go('/dashboard');
            }
        });
      }
});
FlowRouter.route('/dashboard', {
    action() {
        Tracker.autorun(function() {
            if (Meteor.userId()) {
                mount(MainLayout, {
                content: (<DashboardPage/>)
                });
            } else {
              FlowRouter.go('/');
            }
        });
      }
});
FlowRouter.route('/settings', {
    action() {
        Tracker.autorun(function() {
            if (Meteor.userId()) {
                mount(MainLayout, {
                content: (<SettingsPage/>)
                });
            } else {
              FlowRouter.go('/');
            }
        });
      }
});