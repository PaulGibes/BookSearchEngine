const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User } = require("../models");

// defines a number of resolvers that handle various mutations and queries
const resolvers = {
  Query: {
    // retrieves the logged-in user's data (excluding the __v and password fields) from the User model. If the user is not authenticated, it throws an AuthenticationError
    me: async (parent, args, context) => {
      if (context.user) {
        data = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return data;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    // creates a new user in the User model with the provided username, email, and password.
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      // generates a token
      const token = signToken(user);
      return { token, user };
    },

    // retrieves a user from the User model by their email.
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect username or password!");
      }

      // checks if the provided password matches the user's password.
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect username or password!");
      }

      const token = signToken(user);

      return { token, user };
    },

    // adds a new book to the savedBooks field of the logged-in user.
    saveBook: async (parent, { newBook }, context) => {
      // checks if the user is authenticated using the context.user object. If the user is authenticated, it updates the User model by pushing the newBook object into the savedBooks array, and returns the updated user object.
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: newBook } },
          { new: true }
        );
        return updatedUser;
      }
    },

    // removes a book from the savedBooks field.
    removeBook: async (parent, { bookId }, context) => {
      // If the user is authenticated, it updates the User model by pulling the book with the given bookId from the savedBooks array, and returns the updated user object.
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
