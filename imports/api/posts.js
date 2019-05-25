import { Mongo } from 'meteor/mongo';
import { NonEmptyString } from "./validators";
import { check } from 'meteor/check'

export const Posts = new Mongo.Collection('posts')

if (Meteor.isServer) {
    Meteor.publish('posts', function postsPublication() {
        return Posts.find({});
    });
}

Meteor.methods({

    'posts.insert'(title, description){

        if(!Roles.userIsInRole(this.userId, "admin")){
            throw new Meteor.Error(403, "Unauthorized")
        }

        Posts.insert({
            title,
            description,
            createdAt: new Date()
        });
    },

    'posts.update'(article_id, title, description){

        if(!Roles.userIsInRole(this.userId, "admin")){
            throw new Meteor.Error(403, "Unauthorized")
        }

        Posts.update(article_id, {title: title, description: description})
    },

    'posts.delete'(article_id){

        if(!Roles.userIsInRole(this.userId, "admin")){
            throw new Meteor.Error(403, "Unauthorized")
        }

        Posts.remove(article_id)
    }
})