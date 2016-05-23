import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';

import { Accounts } from 'meteor/accounts-base'

//Allow users to remove their own profiles
Meteor.users.allow({remove: function () { return true; }});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'other': 1, 'things': 1}});
  } else {
    this.ready();
  }
});

Meteor.startup(() => {
  // code to run on server at startup
});