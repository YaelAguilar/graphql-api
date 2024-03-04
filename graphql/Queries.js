const {GraphQLString} = require('graphql');

const hello = {
    type: GraphQLString,
            description: 'retorna string',
            resolve: () => 'hola'
}

module.exports = {hello};