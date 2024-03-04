const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require ('graphql');
const {hello} = require('./Queries')

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'root query',
    fields: {
        hello,
    }
})

module.exports = new GraphQLSchema({
    query: QueryType
});
