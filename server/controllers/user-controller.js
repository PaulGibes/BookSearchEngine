// import user model
const { User } = require("../models");
// import sign token function from auth
const { signToken } = require("../utils/auth");

module.exports = {
  // takes an object with user and params as the first parameter and res as a second parameter.
  async getSingleUser({ user = null, params }, res) {
    // get a single user by either their id or their username
    const foundUser = await User.findOne({
      $or: [
        { _id: user ? user._id : params.id },
        { username: params.username },
      ],
    });

    // If the user is found, send a JSON response with the user data. Otherwise, it sends a JSON response with an error message.
    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "Cannot find a user with this id!" });
    }

    res.json(foundUser);
  },

  // create a user and sign in token
  async createUser({ body }, res) {
    const user = await User.create(body);
    // if there was an error send a JSON response and an error message
    if (!user) {
      return res.status(400).json({ message: "Something is wrong!" });
    }
    // If the user is successfully created, it generates a JSON web token (JWT)
    const token = signToken(user);
    res.json({ token, user });
  },

  // {body} is destructured req.body. Contains username, email, and password
  async login({ body }, res) {
    // searches for a user in the database
    const user = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }
    // verifies the password using the isCorrectPassword method on the user model
    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: "Wrong password!" });
    }
    // If the password is correct, it generates a JWT Token and sends a JSON response with the generated token and the user data
    const token = signToken(user);
    res.json({ token, user });
  },

  // save a book to a user's `savedBooks` field by adding it to the set/database (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function, an authenticated user object.
  // body contains the book data
  async saveBook({ user, body }, res) {
    console.log(user);
    // updates the user's savedBooks field using the $addToSet operator to prevent duplicates
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
      // sends a JSON response with the updated user data
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  // remove a book from `savedBooks`
  // user is the authenticated user object and params contains the book ID to be removed
  async deleteBook({ user, params }, res) {
    // updates the user's savedBooks field
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedBooks: { bookId: params.bookId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Couldn't find user with this id!" });
    }
    // if deleted successfully sends a JSON response with the updated user data
    return res.json(updatedUser);
  },
};
