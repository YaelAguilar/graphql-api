const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLInt } = require('graphql');
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
  
//query para obtener lista de posts (paginacion 1)  
const posts = {
  type: new GraphQLList(PostType),
  description: "Recupera una lista paginada de posts",
  args: {
    first: {
      type: GraphQLInt,
      description: 'Número de posts a recuperar en la página.',
    },
    offset: {
      type: GraphQLInt,
      description: 'Número de posts a saltar desde el inicio.',
    },
  },
  resolve: (_, { first = 10, offset = 0 }) => {
    return Post.find().skip(offset).limit(first);
  },

/*
query para obtener lista de posts (sin paginacion)
const posts = {
    type: new GraphQLList(PostType),
    description: "Recupera una lista de posts",
    resolve: () => Post.find(),
  };
*/  
};

//query para obtener un post (3)  
  const post = {
    type: PostType,
    description: "Recupera un solo post",
    args: { id: { type: GraphQLID } },
    resolve: (_, { id }) => Post.findById(id),
  };  

//query para obtener lista de comentarios (4)
const comments = {
  type: new GraphQLList(CommentType),
  description: "Recuperada lista de comentarios",
  resolve: () => Comment.find(),
};  

//query para obtener un comentario (5)
const comment = {
  type: CommentType,
  description: "Recuperado un comentario",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }) => Comment.findById(id),
};

module.exports = { users, user, posts, post, comments, comment };