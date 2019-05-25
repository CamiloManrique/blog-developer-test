import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'


Meteor.methods({
    'signup'(email, password, name, role){
        const user_id = Accounts.createUser({email: email, password: password, profile: {name: name}})
        if(Meteor.isServer){
            Roles.addUsersToRoles(user_id, role, Roles.GLOBAL_GROUP)
        }
    }
})