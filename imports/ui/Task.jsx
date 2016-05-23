import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Tasks } from '../api/tasks.js';
 
// Task component - represents a single todo item
export default class Task extends Component {
    
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked, this.props.task.completedBy);
    //console.log(this.props.task.completedBy);
  }
 
  deleteThisTask() {
    if (confirm("Delete task: " + this.props.task.taskTitle)) {
        Meteor.call('tasks.remove', this.props.task._id);
    } else {
        return
    }
  }
  
  togglePrivate() {
    Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
  }
    
  render() {
    
    const taskClassName = this.props.task.checked ? 'completed singleTaskBox' : 'notCompleted singleTaskBox';
    const visibleInvisible = this.props.task.checked ? 'right chip' : 'isInvisible right chip';
    const done = this.props.task.checked ? 'Done! -' : 'Needs to be completed';
    const completedConstant =  done + this.props.task.completedBy;
    const areDeleteAndPrivacyButtonsVisible = (this.props.task.owner === Meteor.userId()) ? 'right controlButton' : 'right controlButton isInvisible';
    const privacyButtonIcon = ( this.props.task.private ? 'fa fa-user' : 'fa fa-users' )
    return (
      <li className={taskClassName}>
            <div className="row">
                <span className="col s12 l3 centered">Priority: <strong>{this.props.task.taskPriority}</strong></span>
                <span className="col s12 l3 centered">Created by: <strong>{this.props.task.firstName}</strong></span>
                <span className="col s12 l3 centered">Visible by: <strong>{ this.props.task.private ? 'myself only' : 'everyone' }</strong></span>
                <span className="col s12 l3 centered">Created on: <strong>{this.props.task.createdAt.toDateString()}</strong></span>
            </div>
            <div>
                <h4>{this.props.task.taskTitle}</h4>
            </div>
            <div>
                <span className="taskBody">{this.props.task.taskBody}</span>
            </div>
            <hr/>
            <div className="row">
                <div className="col s6">
                    <span><strong>{completedConstant}</strong></span>
                </div>
                <div className="col s6">
                    <span className="right controlButton"><button className="btn-floating waves-effect waves-light" onClick={this.toggleChecked.bind(this)}>&#10003;</button></span>
                    <span className={areDeleteAndPrivacyButtonsVisible}><button className="btn-floating red" onClick={this.deleteThisTask.bind(this)}><i className="fa fa-trash-o" aria-hidden="true"></i></button></span>
                    <span className={areDeleteAndPrivacyButtonsVisible}><button className="btn-floating waves-effect blue darken-2" onClick={this.togglePrivate.bind(this)}><i className={privacyButtonIcon} aria-hidden="true"></i></button></span>
                </div>
            </div>
      </li>
    );
  }
}
 
Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};