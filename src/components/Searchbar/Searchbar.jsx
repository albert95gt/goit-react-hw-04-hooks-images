import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = event => {
    setSearchValue(event.currentTarget.value.toLowerCase())
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchValue.trim() === '') {
      toast.error('Please input a search value!');
      return;
    }
    onSubmit(searchValue);
    setSearchValue('')
  };

  return ( 
    <Header>
    <SearchForm onSubmit={handleSubmit}>
      <SearchFormButton type="submit">
        <AiOutlineSearch size="28" color="#3f51b5" />
      </SearchFormButton>

      <SearchFormInput
        type="text"
        autoComplete="off"
        autoFocus
        value={searchValue}
        placeholder="Search images and photos"
        onChange={handleChange}
      />
    </SearchForm>
  </Header>
   );
}
 
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;

