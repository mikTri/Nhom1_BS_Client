import React, { useState, useEffect, useRef } from 'react';
import { IoIosSearch } from "react-icons/io";
import Button from '@mui/material/Button';
import { fetchDataFromApi } from "../../../utils/api";
import { Link } from 'react-router-dom';



const HandleSearch = async (input) => {
  try {
    const response = await fetchDataFromApi(`/api/search?q=${input}`);
    console.error(response);
    return response; // Return search results instead of logging
  } catch (error) {
    console.error('Error search:', error);
    return []; // Return empty array on error
  }
};

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State to store user input
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const searchWrapperRef = useRef(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (searchTerm) { // Check if search term is not empty
      const results = await HandleSearch(searchTerm);
      setSearchResults(results);
    } else {
      console.warn('Empty search term. Please enter something to search.');
    }
  };


  const handleResultClick = (bookId) => {
    setSearchResults([]); // Clear search results when a result is clicked
  };


  useEffect(() => {
    // Clear search results when search term changes
    if (searchTerm === '') {
      setSearchResults([]);
    }
  }, [searchTerm]); // Dependency on searchTerm


  // đóng khi click bên ngoài ô search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  return (
    <form onSubmit={handleSubmit} className='headerSearch ml-20' ref={searchWrapperRef}>
      <input
        type='text'
        placeholder='Tìm kiếm sản phẩm tại đây...'
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Button type="submit" title="Tìm kiếm tại đây"><IoIosSearch/></Button>

      {searchResults.length > 0 && (
        <ul className="search-results search-results-active"> {/* Added class name */}
          {/* Iterate through searchResults and display book information */}
          {searchResults.map((book) => (
            <li key={book._id} onClick={() => handleResultClick(book._id)} >
                <Link to={`/product-details/${book._id}`}>
                  <img src={book.cover} alt={book.title} />              
                </Link>

              <div>
                <h2>{book.title}</h2>
                <p>By {book.author}</p>
                {/* Display other relevant book details (optional) */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBox;
