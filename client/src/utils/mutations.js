import { gql } from "@apollo/client";

// This mutation includes logic for logging in a user. It takes in two variables, $email and $password, and sends them as arguments to the login mutation on the server. The mutation returns a token and the user information _id and username.
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($email: String!, $username: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($addingBook: AddBook!) {
    saveBook(addingBook: $addingBook) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!){
  deleteBook(bookId: $bookId) {
    savedBooks {
      bookId
      title
    }
    _id
    username
  }
}
`;