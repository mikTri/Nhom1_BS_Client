import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BookPreview = ({ bookList }) => {
  const [showGenres, setShowGenres] = useState(true); // Initial state: show genres
  const [selectedGenre, setSelectedGenre] = useState(''); // Selected genre (initially empty)
  const [selectedAuthor, setSelectedAuthor] = useState(''); // Selected author (initially empty)
  const [genres, setGenres] = useState([]); // State to store unique genres
  const [authors, setAuthors] = useState([]); // State to store unique authors

  useEffect(() => {
    const genreSet = new Set();
    const authorSet = new Set();

    bookList.forEach((book) => {
      genreSet.add(book.genres); // Assuming genres is a string
      authorSet.add(book.author);
    });

    setGenres(Array.from(genreSet));
    setAuthors(Array.from(authorSet));
  }, [bookList]); // Update genres and authors when bookList changes

  const toggleSections = () => {
    // Reset filters when switching sections
    setSelectedGenre('');
    setSelectedAuthor('');
    setShowGenres(!showGenres); // Toggle showGenres state
  };

  const handleSelectionChange = (item, type) => {
    if (type === 'genre') {
      setSelectedGenre(item);
      // Reset author filter when selecting genre
      setSelectedAuthor('');
    } else if (type === 'author') {
      setSelectedAuthor(item);
      // Reset genre filter when selecting author
      setSelectedGenre('');
    }
  };

  const filteredBooks = bookList.filter((book) => {
    const genreMatch = selectedGenre === '' || selectedGenre === book.genres;
    const authorMatch = selectedAuthor === '' || selectedAuthor === book.author;
    return genreMatch && authorMatch;
  });

  return (
    <div className="BookPreview">
      <h2>Sách đề cử</h2>
      <div className="switch-toggle">
        <button
          className={showGenres ? 'active genres' : 'genres'}
          onClick={toggleSections}
        >
          Thể loại
        </button>
        <button className={!showGenres ? 'active authors' : 'authors'} onClick={toggleSections}>
          Tác giả
        </button>
      </div>
      {showGenres && (
        <div className="genres-list">
          <h3>Thể loại</h3>
          <MultiwaySwitchButton options={genres} selectedValue={selectedGenre} onSelect={(item) => handleSelectionChange(item, 'genre')} />
        </div>
      )}
      {!showGenres && (
        <div className="authors-list">
          <h3>Tác Giả</h3>
          <MultiwaySwitchButton options={authors} selectedValue={selectedAuthor} onSelect={(item) => handleSelectionChange(item, 'author')} />
        </div>
      )}
      {filteredBooks.length > 0 && (
        <ul className="book-list">
          {/* Render only the first 5 filtered books */}
          {filteredBooks.slice(0, 5).map((book) => (
            <li key={book._id} className='book-item'>
              <Link to={`/product-details/${book._id}`}>
                {book.cover && <img src={book.cover} alt={book.title} width="80" height="auto" />}
                
                {/* <span className='book-info'> */}
                  {/* <div> {book.title} </div> */}
                  <p className='title-container'>{book.title.length > 60 ? `${book.title.slice(0, 60)}...` : book.title}</p>
                  <div className="price">
                    <span className="original">{book.basePrice.toLocaleString('vi-VN')}</span>
                    <span className="sale">{book.discountPrice.toLocaleString('vi-VN')} VND</span>
                </div>
                {/* </span> */}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {filteredBooks.length === 0 && <p>No books match your filter criteria.</p>}
    </div>
  );
};

const MultiwaySwitchButton = ({ options, selectedValue, onSelect }) => {
  // Implement logic to render buttons and handle selection
  return (
    <div className="multiway-switch-button">
      {/* Render buttons for each option and handle selection */}
      {options.map((option) => (
        <button key={option} className={option === selectedValue ? 'active' : ''} onClick={() => onSelect(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default BookPreview;
