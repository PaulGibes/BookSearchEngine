export const getSavedBookIds = () => {
  // Retrieves the saved book IDs from the localStorage, which attempts to get the value associated with the key 'saved_books'.
  const savedBookIds = localStorage.getItem("saved_books")
    ? // If the value exists and is not null, it is parsed from JSON format using JSON.parse() and returned as an array. Otherwise, an empty array [] is returned.
      JSON.parse(localStorage.getItem("saved_books"))
    : [];

  return savedBookIds;
};

// Takes an array of book IDs (bookIdArr) as an argument and stores it in localStorage under the key 'saved_books'.
export const saveBookIds = (bookIdArr) => {
  // If the bookIdArr is empty, meaning there are no saved book IDs, the function removes the key 'saved_books' from localStorage.
  if (bookIdArr.length) {
    localStorage.setItem("saved_books", JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem("saved_books");
  }
};

export const removeBookId = (bookId) => {
  // Retrieves the current saved book IDs from localStorage and if the value exists and is not null, it is parsed from JSON format using JSON.parse().
  const savedBookIds = localStorage.getItem("saved_books")
    ? JSON.parse(localStorage.getItem("saved_books"))
    : null;

  if (!savedBookIds) {
    return false;
  }

  // Filters the array to remove the bookId from the list of saved book IDs. The updated array of saved book IDs is stored back in localStorage
  const updatedSavedBookIds = savedBookIds?.filter(
    (savedBookId) => savedBookId !== bookId
  );
  localStorage.setItem("saved_books", JSON.stringify(updatedSavedBookIds));

  // if it was successfully removed return true. If not, return false (line 29)
  return true;
};
