const {GraphQLSchema, GraphQLObjectType} = require ('graphql');
const { users, user, posts, post } = require('./queries');
const { register, login, createPost, updatePost, deletePost } = require('./mutations');

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'root query',
    fields: {
        users, 
        user,
        posts,
        post,
    },
});

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'root mutation',
    fields: {
        register,
        login,
        createPost,
        updatePost,
        deletePost,
    },
});

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});
