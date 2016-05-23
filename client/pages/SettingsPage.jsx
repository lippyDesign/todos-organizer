import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ChangePassword from '../components/ChangePassword.jsx';
import RemoveUser from '../components/RemoveUser.jsx';

export default class SettingsPage extends Component {
  
  changePassworedTapped(e) {
        e.preventDefault();
        var oldPassword = ReactDOM.findDOMNode(this.refs.changePasswordForm.refs.oldPassword).value.trim();
        var newPassword = ReactDOM.findDOMNode(this.refs.changePasswordForm.refs.newPassword).value.trim();
        var confirmPassword = ReactDOM.findDOMNode(this.refs.changePasswordForm.refs.confirmPassword).value.trim();
        if (confirmPassword === newPassword && newPassword !== "") {
            Accounts.changePassword(oldPassword, newPassword, (er)=> {
                if (er) {
                    Materialize.toast(er.reason, 4000);
                } else {
                    Materialize.toast('New password has been set', 4000);
                    FlowRouter.go('/dashboard');
                }
            });
        } else {
            Materialize.toast('Passwords do not match or a field is empty', 4000);
        }
    }
    deleteAccountTapped(e) {
        e.preventDefault();
        if (confirm("Delete this account?")) {
            Meteor.users.remove({_id: Meteor.userId()});
            Materialize.toast('Account Removed. Good By! );', 4000);
        } else {
            return
        }
        FlowRouter.go('/dashboard');
    }
  
  render() {
    return (
      <div className="container">
        <h3 className="colorWhite">Settings</h3>
        <hr/>
        <ChangePassword ref="changePasswordForm" changePassword={this.changePassworedTapped.bind(this)}/>
        <hr/>
        <RemoveUser deleteAccount={this.deleteAccountTapped.bind(this)}/>
      </div>
    );
  }
}