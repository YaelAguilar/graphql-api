const { GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql');
const { UserType, PostType, CommentType } = require('./types');
const { User, Post, Comment } = require('../models');

//query para obtener lista de usuarios (1)
const users = {
    type: new GraphQLList(UserType),
    description: "Recupera una lista de usuarios.",
    resolve: () => User.find(),
  };
  













































module.exports = { users, };