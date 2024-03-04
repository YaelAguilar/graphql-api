const { GraphQLString } = require("graphql");
const { User } = require('../models');
const { createJWTToken } = require('../util/auth');

const register = {
    type: GraphQLString,
        description: 'Registra un usuario y retorna un token',
        args: {
            username: { type:GraphQLString },
            email: { type:GraphQLString },
            password: { type:GraphQLString },
            displayName: { type:GraphQLString },
        },
        async resolve(_, args) {
            const { username, email, password, displayName} = args;
            const user = new User({username, email, password, displayName})
                await user.save();

                const token = createJWTToken(user);

                console.log(user);
                console.log(token);
                return token;
        },
};

const login = {
    type: GraphQLString,
    args: {
        email: { type:GraphQLString },
        password: { type:GraphQLString },
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