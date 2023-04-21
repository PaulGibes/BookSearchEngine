// setup for React and Apollo Client
import { gql } from "@apollo/client";

// setup for User data and any saved book data
// loads in 'SavedBooks.js'
export const GET_ME = gql`
query me {
  me {
    _id
    username
    email
    password
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;
