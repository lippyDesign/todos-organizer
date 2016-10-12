import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';

import { Accounts } from 'meteor/accounts-base'

//Allow users to remove their own profiles
Meteor.users.allow({remove: function () { return true; }});

Meteor.startup(() => {
  // code to run on server at startup
});