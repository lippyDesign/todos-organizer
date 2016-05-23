import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';
 
import Task from './Task.jsx';
 
class App extends Component {
    
    constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
      priorityOneClass: "prioritySel",
      priorityTwoClass: "prioritySel",
      priorityThreeClass: "prioritySel",
      priorityFourClass: "prioritySel",
      priorityFiveClass: "prioritySel",
      prioritySelected: ""
    };
  }
    
  handleSubmit(event) {
    event.preventDefault();
    
    if (this.state.prioritySelected !== "") {
        // Find the text field via the React ref
    const taskTitle = ReactDOM.findDOMNode(this.refs.taskTitle).value.trim();
    const taskPriority = this.state.prioritySelected;
    const taskBody = ReactDOM.findDOMNode(this.refs.taskBody).value.trim();
    
    Meteor.call('tasks.insert', taskTitle, taskPriority, taskBody);
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.taskTitle).value = '';
    ReactDOM.findDOMNode(this.refs.taskBody).value = '';
    this.setState({
          priorityOneClass: "prioritySel",
          priorityTwoClass: "prioritySel",
          priorityThreeClass: "prioritySel",
          priorityFourClass: "prioritySel",
          priorityFiveClass: "prioritySel",
          prioritySelected: ""
      })
    } else {
        Materialize.toast("Please select priority", 4000);
    }
  }
  
  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }
 
  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;
 
      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }
  
  priorityOneSelected(event) {
      event.preventDefault();
      this.setState({
          priorityOneClass: "prioritySel priorityActive",
          priorityTwoClass: "prioritySel",
          priorityThreeClass: "prioritySel",
          priorityFourClass: "prioritySel",
          priorityFiveClass: "prioritySel",
          prioritySelected: "1"
      })
  }
  priorityTwoSelected(event) {
      event.preventDefault();
      this.setState({
          priorityOneClass: "prioritySel",
          priorityTwoClass: "prioritySel priorityActive",
          priorityThreeClass: "prioritySel",
          priorityFourClass: "prioritySel",
          priorityFiveClass: "prioritySel",
          prioritySelected: "2"
      })
  }
  priorityThreeSelected(event) {
      event.preventDefault();
      this.setState({
          priorityOneClass: "prioritySel",
          priorityTwoClass: "prioritySel",
          priorityThreeClass: "prioritySel priorityActive",
          priorityFourClass: "prioritySel",
          priorityFiveClass: "prioritySel",
          prioritySelected: "3"
      })
  }
  priorityFourSelected(event) {
      event.preventDefault();
      this.setState({
          priorityOneClass: "prioritySel",
          priorityTwoClass: "prioritySel",
          priorityThreeClass: "prioritySel",
          priorityFourClass: "prioritySel priorityActive",
          priorityFiveClass: "prioritySel",
          prioritySelected: "4"
      })
  }
  priorityFiveSelected(event) {
      event.preventDefault();
      this.setState({
          priorityOneClass: "prioritySel",
          priorityTwoClass: "prioritySel",
          priorityThreeClass: "prioritySel",
          priorityFourClass: "prioritySel",
          priorityFiveClass: "prioritySel priorityActive",
          prioritySelected: "5"
      })
  }
  
  render() {
    var firstNameOfUser;
    if (Meteor.users.findOne(Meteor.userId())) {
      firstNameOfUser = Meteor.users.findOne(Meteor.userId()).profile.firstName
    }
    var hideButtonTittle;
    var completedTaskslabel;
    if (this.state.hideCompleted) {
        var hideButtonTittle = "Show Completed Tasks"
    } else {
        var hideButtonTittle = "Hide Completed Tasks"
    }
      
    return (
      <div>
        <header>
          <h4 className="colorWhite">Tasks to complete: {this.props.incompleteCount}</h4>
          <form className="new-task col s12" onSubmit={this.handleSubmit.bind(this)} >
            <h4>{ firstNameOfUser ? firstNameOfUser : 'user' } add a task</h4>
            <div className="row">
                <div  ref="taskPriority" className="col s12 m12 l4">
                <ul className="prioritySelContainer">
                    <li className="prioritySel"><strong>Priority:</strong></li>
                    <li className={this.state.priorityOneClass}><a href="#" onClick={this.priorityOneSelected.bind(this)}>1</a></li>
                    <li className={this.state.priorityTwoClass}><a href="#" onClick={this.priorityTwoSelected.bind(this)}>2</a></li>
                    <li className={this.state.priorityThreeClass}><a href="#" onClick={this.priorityThreeSelected.bind(this)}>3</a></li>
                    <li className={this.state.priorityFourClass}><a href="#" onClick={this.priorityFourSelected.bind(this)}>4</a></li>
                    <li className={this.state.priorityFiveClass}><a href="#" onClick={this.priorityFiveSelected.bind(this)}>5</a></li>
                </ul>
                </div>
                <input type="text" ref="taskTitle" placeholder="Task title" className="col s12 m12 l8 "/>
                <input type="text" ref="taskBody" placeholder="Task body" className="col s12"/>
            </div>
            <div className="row">
                <button className="waves-effect waves-light btn-large col s12 l4 offset-l4">Submit Task</button>
            </div>
          </form>
          <div className="row" id="hideCompletedDivi">
            <button onClick={this.toggleHideCompleted.bind(this)} className="hideButtonTittle waves-effect amber darken-3 btn col s10 offset-s1 l4 offset-l1">{hideButtonTittle}</button>
          </div>
        </header>
 
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};
 
export default createContainer(() => {
    
  Meteor.subscribe('tasks');
    
  return {
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, App);