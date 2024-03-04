const { GraphQLString } = require('graphql');

const hello = {
    type: GraphQLString,
        description: 'retorna string',
        resolve() {
            return 'hola'
        },
};

module.exports = {
    hello,
};