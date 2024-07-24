import React, { useState, useEffect } from 'react';
import { fetchDataFromApi } from '../../utils/api';
import { Link } from 'react-router-dom';


const MultiwaySwitchButton = ({ options, selectedValue, onSelect }) => {
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

const Leaderboard = () => {
  const [genres, setGenres] = useState([]); // Genres from API call
  const [authors, setAuthors] = useState([]); // Authors from API call
  const [selectedGenre, setSelectedGenre] = useState(''); // Selected genre
  const [selectedAuthor, setSelectedAuthor] = useState(''); // Selected author
  const [topBooks, setTopBooks] = useState([]); // Top 5 books for selection
  const [isLoading, setIsLoading] = useState(false); // Flag for loading state

  // Fetch genres and authors on component mount
  useEffect(() => {
    const fetchGenresAndAuthors = async () => {
      try {
        setIsLoading(true); // Set loading state

        // Replace with your actual API calls
        const responseGenres = await fetchDataFromApi('/api/books/genres'); // Assuming API endpoint for genres
        const responseAuthors = await fetchDataFromApi('/api/books/top-authors'); // Assuming API endpoint for authors
        console.log(responseAuthors)
        console.log(responseGenres)
        setGenres(responseGenres); // Assuming data property in response
        setAuthors(responseAuthors); // Assuming data property in response
      } catch (error) {
        console.error('Error fetching genres/authors:', error);
      } finally {
        setIsLoading(false); // Clear loading state
      }
    };
    fetchGenresAndAuthors();
  }, []);

  // Fetch top 5 books based on selection
  useEffect(() => {
    const fetchTopBooks = async () => {
      if (selectedGenre || selectedAuthor) {
        setIsLoading(true); // Set loading state

        try {
          let endpoint = '/api/books/top-rating'; // Base endpoint for books
          if (selectedGenre) {
            endpoint += `-genres?genres=${encodeURIComponent(selectedGenre)}`; // Add genre parameter
          } else if (selectedAuthor) {
            endpoint += `?authors=${encodeURIComponent(selectedAuthor)}`; // Add author parameter
          }
          const responseBooks = await fetchDataFromApi(endpoint);
          console.log(responseBooks)
          setTopBooks(responseBooks)
        } catch (error) {
          console.error('Error fetching top books:', error);
        } finally {
          setIsLoading(false); // Clear loading state
        }
      } else {
        setTopBooks([]); // Clear top books if no selection
      }
    };
    fetchTopBooks();
  }, [selectedGenre, selectedAuthor]);

  const handleSelectionChange = (item, type) => {
    if (type === 'genre') {
      setSelectedGenre(item);
      setSelectedAuthor(''); // Reset author on genre selection
    } else if (type === 'author') {
      setSelectedAuthor(item);
      setSelectedGenre(''); // Reset genre on author selection
    }
  };

  return (
    <div className="LB-Leaderboard">
      <h2>Bảng xếp hạng</h2>
      <p className='LB-Leaderboard-note'>(Vui lòng chọn tên Thể loại hoặc Tác giả)</p>

      <div className="LB-filters">
        {genres.length > 0 && (
          <div className="LB-genres-list">
            <h3>Thể loại</h3>
            <MultiwaySwitchButton
              // options={genres}
              options={genres.map((genre) => genre.genre)}
              selectedValue={selectedGenre}
              onSelect={(item) => handleSelectionChange(item, 'genre')}
            />
          </div>
        )}

        {authors.length > 0 && (
          <div className="LB-authors-list">
            <h3>Tác Giả</h3>
            <MultiwaySwitchButton
              options={authors.map((author) => author._id)}
              selectedValue={selectedAuthor}
              onSelect={(item) => handleSelectionChange(item, 'author')}
            />
          </div>
        )}
      </div>
      
      <div className="LB-top-books-list-container">
        <h3> {selectedGenre ? `Top 5 tác phẩm theo thể loại: ${selectedGenre}` : selectedAuthor ? `Top 5 tác phẩm của ${selectedAuthor}` : ''}</h3>
        <br/>
        {isLoading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
        topBooks.length > 0 && (
          <ul className="book-list">
            {/* Render top books details here (similar to BookPreview) */}
            {topBooks.map((book) => (
              <li key={book.id} className="LB-book-item">
                <Link to={`/product-details/${book._id}`}>
                  {book.cover && <img src={book.cover} alt={book.title} width="80" height="auto" />}
                  <p>{book.title.length > 60 ? `${book.title.slice(0, 60)}...` : book.title}</p>
                  <div className="price">
                    <span className="original">{book.basePrice.toLocaleString('vi-VN')}</span>
                    <span className="sale">{book.discountPrice.toLocaleString('vi-VN')} VND</span>
                  </div>
                </Link>
              </li>

              // <li key={item.id}>               
              // <Link to={`/product-details/${item.id}`}>
              //   <img src={item.cover} alt={item.title}/>
              //   <p className='title-container'>{item.title.length > 60 ? `${item.title.slice(0, 60)}...` : item.title}</p>
              //   <div className="price">
              //     <span className="original">{item.basePrice.toLocaleString('vi-VN')}</span>
              //     <span className="sale">{item.discountPrice.toLocaleString('vi-VN')} VND</span>
              //   </div>
              // </Link>
              // </li>

            ))}
            {topBooks.length === 0 && !isLoading && <p>Không có dữ liệu phù hợp.</p>}
          </ul>
        )
      )}
  </div>

      


  </div>
  );
}

export default Leaderboard;