const {GraphQLSchema, GraphQLObjectType} = require ('graphql');
const { hello } = require('./Queries');
const { register } = require('./Mutations');

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'root query',
    fields: {
        hello,
    },
});

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'root mutation',
    fields: {
        register,
    },
});

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});
