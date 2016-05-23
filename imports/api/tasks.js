import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'tasks.insert'(taskTitle, taskPriority, taskBody,) {
    check(taskTitle, String);
    check(taskPriority, String);
    check(taskBody, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.insert({
      taskTitle,
      taskPriority,
      taskBody,
      createdAt: new Date(),
      owner: this.userId,
      firstName: Meteor.users.findOne(this.userId).profile.firstName,
      lastName: Meteor.users.findOne(this.userId).profile.lastName,
      completedBy: ""
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);
    const task = Tasks.findOne(taskId);
    if (task.owner !== this.userId) {
      // make sure only the owner can delete task
      Materialize.toast("A task can only be removed by its owner", 4000);
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked, compBy) {
    check(taskId, String);
    check(setChecked, Boolean);
    check(compBy, String);
    
    if (compBy === "") {
        Tasks.update(taskId, { $set: { completedBy: Meteor.users.findOne(this.userId).profile.firstName } });
    } else {
        Tasks.update(taskId, { $set: { completedBy: "" } });
    }
    
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }
    
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  'tasks.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);
 
    const task = Tasks.findOne(taskId);
 
    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
        Materialize.toast("Only the task's creator can change its privacy", 4000);
        throw new Meteor.Error('not-authorized');
    } else {
        Tasks.update(taskId, { $set: { private: setToPrivate } });
    }
  },
});