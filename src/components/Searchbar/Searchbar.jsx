import { useState } from 'react';
import StyledSearchBar from './StyledSearchBar';
import { CiSearch } from 'react-icons/ci';
import PropTypes from 'prop-types';

function SearchBar({ handleSubmit }) {
  const [searchNameImg, setSearchNameImg] = useState('');

  const onSearchSubmit = event => {
    event.preventDefault();
    handleSubmit(searchNameImg);
  };

  const onInputChange = event => {
    setSearchNameImg(prevState => (prevState = event.target.value));
  };

  return (
    <StyledSearchBar className="searchbar">
      <form className="form" onSubmit={onSearchSubmit}>
        <button type="submit" className="button">
          <CiSearch className="icon" />
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputChange}
        />
      </form>
    </StyledSearchBar>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
