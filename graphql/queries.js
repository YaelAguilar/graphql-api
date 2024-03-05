const { GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql');
const { UserType, PostType, CommentType } = require('./types');
const { User, Post, Comment } = require('../models');

//query para obtener lista de usuarios (1)
const users = {
    type: new GraphQLList(UserType),
    description: "Recupera una lista de usuarios.",
    resolve: () => User.find(),
  };

//query para obtener un usuario (2)
const user = {
    type: UserType,
    description: "Recupera un usuario",
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (_, { id }) => User.findById(id),
  };
  
//query para obtener lista de posts (3)  
const posts = {
    type: new GraphQLList(PostType),
    description: "Recupera una lista de posts",
    resolve: () => Post.find(),
  };

//query para obtener un posts (4)  
  const post = {
    type: PostType,
    description: "Recupera un solo post",
    args: { id: { type: GraphQLID } },
    resolve: (_, { id }) => Post.findById(id),
  };  

//query para obtener lista de comentarios (5)
const comments = {
  type: new GraphQLList(CommentType),
  description: "Recuperada lista de comentarios",
  resolve: () => Comment.find(),
};  

//query para obtener un comentario (6)
const comment = {
  type: CommentType,
  description: "Recuperado un comentario",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }) => Comment.findById(id),
};

module.exports = { users, user, posts, post, comments, comment };