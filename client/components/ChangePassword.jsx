import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ChangePassword extends Component {
  
    render() {
        return (
            <div className="inputForm">
                <div className="row">
                    <h4 className="text-center">Change Password</h4>
                    <form onSubmit={this.props.changePassword} className="col offset-l4 l4 s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="oldPassword" type="password" ref="oldPassword" className="validate"></input>
                                <label htmlFor="oldPassword">Old Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="newPassword" type="password" ref="newPassword" className="validate"></input>
                                <label htmlFor="newPassword">New Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="confirmPassword" type="password" ref="confirmPassword" className="validate"></input>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <button className="waves-effect waves-light btn btn-large col s12">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}