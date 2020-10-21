const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const foundUser = await User.findOne({ _id: context.user._id })
                    .select('__v -password')
                    .populate('favorites')
                    .populate('savedMovies')
                return foundUser;
            }   
            throw new AuthenticationError('Not logged in');
        },
    }, 

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user)
            return { token, user };
        },
        addUser: async (parent, args) => {
            console.log('args', args)

            const user = await User.create(args);
            const token = signToken(user);
            
            return { token, user };
        },
        saveMovie: async (parent, { movieId }, context) => {
            
            if (context.user) {
                const updatedMovies = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedMovies: movieId } },
                    { new: true }
                ).populate('savedMovies');
                return updatedMovies
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addFavorite: async (parent, { movieId }, context) => {
            if (context.user) {
              const updatedFavorites = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { favorites: movieId } },
                { new: true }
              ).populate('favorites');
          
              return updatedFavorites;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        }, 
        removeMovie: async (parent, { movieId }, context) => {
            if (context.user) {
                const updatedMovies = await User.deleteOne(
                    {_id: context.user._id},
                    { $pull: { savedMovies: movieId }}
                    .populate('savedMovies'),
                    {new: true }
                );
                return updatedMovies
            }

            throw new AuthenticationError('You need to be logged in!');
        }, 
        removeFavorite: async (parent, { movieId }, context) => {
            if (context.user) {
                const updatedFavorites = await User.deleteOne(
                    {_id: context.user._id},
                    { $pull: { favorites: movieId}}
                    .populate('favorites'),
                    {new: true }
                );
                return updatedFavorites
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;