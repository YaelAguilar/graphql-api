const { GraphQLString, GraphQLID, GraphQLNonNull } = require('graphql');
const { User } = require('../models');
const { createJWTToken } = require('../util/auth');

const register = {
    type: GraphQLString,
        description: 'Registrar usuarios',
        args: {
            username: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
            displayName: { type: new GraphQLNonNull(GraphQLString) },
        },
        async resolve(_, { username, email, password, displayName }) {
            const user = new User({ username, email, password, displayName });
            user.password = await bcrypt.encryptPassword(user.password);
            await user.save();
        
            const token = auth.createJWTToken({
              _id: user._id,
              email: user.email,
              displayName: user.displayName,
            });
            return token;
          },
};

const login = {
    type: GraphQLString,
    description: 'Iniciar Sesion',
    args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(_, { email, password }) {
        const user = await User.findOne({ email }).select("+password");
    
        if (!user) throw new Error("Invalid Username");
    
        const validPassword = await bcrypt.comparePassword(password, user.password);
    
        if (!validPassword) throw new Error("Invalid Password");
    
        const token = auth.createJWTToken({
          _id: user._id,
          email: user.email,
          displayName: user.displayName,
        });
    
        return token;
      },

};
module.exports = {
    register,
    login,
};