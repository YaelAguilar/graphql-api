const {GraphQLSchema, GraphQLObjectType} = require ('graphql');
const { users, user, posts, post, comments, comment } = require('./queries');
const { register, login, createPost, updatePost, deletePost, addComment, updateComment } = require('./mutations');

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'root query',
    fields: {
        users, 
        user,
        posts,
        post,
        comments,
        comment,
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
        addComment,
        updateComment,
    },
});

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});
