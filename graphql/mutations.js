const { GraphQLString, GraphQLID, GraphQLNonNull } = require("graphql");
const { User, Post, Comment } = require('../models');
const { PostType, CommentType } = require("./types");
const { auth, bcrypt } = require("../util");

//mutacion para register (0.1)
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

//mutacion para login (0.2)
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

//mutacion para crear un post (1)
const createPost = {
  type: PostType,
  description: "Crear un nuevo post en el blog",
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, args, { verifiedUser }) {
    if (!verifiedUser) throw new Error("You must be logged in to do that");

    const userFound = await User.findById(verifiedUser._id);
    if (!userFound) throw new Error("Unauthorized");

    const post = new Post({
      authorId: verifiedUser._id,
      title: args.title,
      body: args.body,
    });

    return post.save();
  },
};

//mutacion para editar un post (2)
const updatePost = {
  type: PostType,
  description: "se actualizo el post",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { id, title, body }, { verifiedUser }) {
    if (!verifiedUser) throw new Error("Unauthorized");

    const postUpdated = await Post.findOneAndUpdate(
      { _id: id, authorId: verifiedUser._id },
      { title, body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!postUpdated) throw new Error("No post for given id");

    return postUpdated;
  },
};

//mutacion para eliminar un post (3)
const deletePost = {
  type: GraphQLString,
  description: "Borrar post",
  args: {
    postId: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_, args, { verifiedUser }) {
    const postDeleted = await Post.findOneAndDelete({
      _id: args.postId,
      authorId: verifiedUser._id,
    });
    if (!postDeleted)
      throw new Error("No post with given ID Found for the author");

    return "Post deleted";
  },
};

//mutacion para crear un comentario en un post (4)
const addComment = {
  type: CommentType,
  description: "Crea un nuevo comentario",
  args: {
    comment: { type: new GraphQLNonNull(GraphQLString) },
    postId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(_, { postId, comment }, { verifiedUser }) {
    const newComment = new Comment({
      userId: verifiedUser._id,
      postId,
      comment,
    });
    return newComment.save();
  },
};







module.exports = {
    register,
    login,
    createPost,
    updatePost,
    deletePost,
    addComment,
};