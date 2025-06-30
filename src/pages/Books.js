import React, { useCallback, useMemo, useState } from "react";
import Navbar from "../Compnents/Navbar";
import { useDispatch } from "react-redux";
import { addToFavorites } from "../redux/favoritesSlice";
import { useQuery } from "@tanstack/react-query";
import BookCard from "./BookCard";

function Books() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchedWord, setSearchedWord] = useState("");
  const booksPerPage = 12;

  const fetchBooks = async () => {
    const responses = await Promise.all([
      fetch("https://www.googleapis.com/books/v1/volumes?q=fiction"),
      fetch("https://www.googleapis.com/books/v1/volumes?q=business"),
      fetch("https://www.googleapis.com/books/v1/volumes?q=history"),
      fetch("https://www.googleapis.com/books/v1/volumes?q=arabic"),
      fetch("https://www.googleapis.com/books/v1/volumes?q=islamic"),
      fetch("https://www.googleapis.com/books/v1/volumes?q=children+books"),
      fetch("https://www.googleapis.com/books/v1/volumes?q=graphic+design"),
    ]);
    const results = await Promise.all(
      responses.map((response) => response.json())
    );
    const combinedBooks = results.flatMap((results) => results.items || []);
    return combinedBooks;
  };

  //1. Fetch Books using react Query.
  const {
    data: allBooks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Books"],
    queryFn: fetchBooks,
  });

  //3. useMemo for filtered Books:
  const filteredBooks = useMemo(() => {
    return (allBooks || []).filter(
      (book) =>
        book.volumeInfo?.title
          .toLowerCase()
          .startsWith(searchedWord.toLowerCase()) ||
        book.volumeInfo?.authors?.[0]
          .toLowerCase()
          .startsWith(searchedWord.toLowerCase())
    );
  }, [searchedWord, allBooks]);

  //2. Defensive check BEFORE using array methods.
  const totalPages = filteredBooks
    ? Math.ceil(filteredBooks.length / booksPerPage)
    : 0;
  const startIndex = currentPage * booksPerPage;
  const paginatedBooks =
    filteredBooks?.slice(startIndex, startIndex + booksPerPage) || [];

  //4. Handle Favorite:
  const handleFavorite = useCallback(
    (book) => {
      dispatch(addToFavorites(book));
    },
    [dispatch]
  );

  //5. Guarded early returns (AFTER book definitions):
  if (isLoading || !Array.isArray(allBooks))
    return (
      <div className="justify-content-center">
<iframe src="https://lottie.host/embed/ea8e7864-ac11-4c49-b985-7e8b3e9e3794/uLsfRnZqbF.lottie"></iframe>      </div>
    );
  if (error) return <p>Something went wrong 😢</p>;

  return (
    <div>
      <Navbar />
      <h1 className="pt-3">Books list</h1>
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6">
          <input
            className="form-control"
            placeholder="Type to search..."
            value={searchedWord}
            onChange={(e) => setSearchedWord(e.target.value)}
            type="search"
            name=""
            id=""
          />
        </div>
      </div>
      <div className="row m-4">
        {paginatedBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            handleFavorite={handleFavorite}
            isFavoritePage={false}
          />
        ))}
      </div>

      <nav aria-label="...">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            >
              Previous
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Books;
