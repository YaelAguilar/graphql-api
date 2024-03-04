const {GraphQLSchema, GraphQLObjectType} = require ('graphql');
const { users, user, posts } = require('./queries');
const { register, login, createPost } = require('./mutations');

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'root query',
    fields: {
        users, 
        user,
        posts,
    },
});

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'root mutation',
    fields: {
        register,
        login,
        createPost,
    },
});

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});
