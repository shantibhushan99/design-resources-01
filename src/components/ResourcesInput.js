import React, { useContext } from 'react';
import { ResourcesContext } from '../context/ResourcesContext';
import { Star, Search, Cancel, ArrowDropDown } from '@material-ui/icons';

const ResourcesInput = ({ resources }) => {
  const {
    searchTextQuery,
    searchDropdownQuery,
    showFavorites,
    listedResources,
  } = useContext(ResourcesContext);

  const [searchTextQueryValue, setSearchTextQueryValue] = searchTextQuery;
  const [
    searchDropdownQueryValue,
    setSearchDropdownQueryValue,
  ] = searchDropdownQuery;
  const [showFavoritesValue, setShowFavoritesValue] = showFavorites;
  const [listedResourcesValue] = listedResources;

  const resourceCategories = () => {
    const allCategories = resources.map((resource) => resource.category);
    return ['All Categories', ...new Set(allCategories)];
  };

  const handleTextChange = (e) => {
    setSearchTextQueryValue(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setSearchDropdownQueryValue(e.target.value);
  };

  const toggleFavorites = (e) => {
    setShowFavoritesValue(e.target.checked);
  };

  const resetTextSearch = () => {
    setSearchTextQueryValue('');
  };
  return (
    <div className='search-page'>
      <h1 className='title'>
        Find Design Resources
        <span role='img' aria-label='search'>
          🧐
        </span>
      </h1>
      <div className='reference-title'>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://github.com/bradtraversy/design-resources-for-developers'
        >
          <h3>Inspired By Brad Traversy's Repo</h3>
        </a>
      </div>

      <div className='inputs'>
        <div className='text-input-wrapper'>
          <div className='text-input'>
            <input
              className='text-input-input'
              placeholder='Search...'
              onChange={handleTextChange}
              value={searchTextQueryValue}
            ></input>
            <Search className='search-icon' />
            <Cancel className='text-input-cancel' onClick={resetTextSearch} />
          </div>
          <h3 className='counter'>
            {`Found ${listedResourcesValue.length} of ${resources.length} `}
          </h3>
        </div>
        <div className='dropdown-wrapper'>
          <select
            className='dropdown'
            value={searchDropdownQueryValue}
            onChange={handleDropdownChange}
          >
            {resourceCategories().map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ArrowDropDown className='arrow-dropdown' />
        </div>
        <div className='show-favorites-label-wrapper'></div>
        <label className='show-favorites-label'>
          Show Favorites
          <input
            checked={showFavoritesValue}
            type='checkbox'
            style={{ display: 'none' }}
            className='checkbox'
            onChange={toggleFavorites}
          />
          <Star
            className='star-icon'
            style={
              showFavoritesValue ? { color: 'yellow' } : { color: 'white' }
            }
          />
        </label>
      </div>
    </div>
  );
};

export default ResourcesInput;
