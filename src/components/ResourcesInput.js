import React, { useContext } from 'react';
import { ResourcesContext } from '../context/ResourcesContext';
import { Star, Search, Cancel, ArrowDropDown } from '@material-ui/icons';

const ResourcesInput = ({ resources }) => {
  const {
    searchTextQuery,
    searchDropdownQuery,
    showFavorites,
    favoriteResourcesId,
    listedResources,
  } = useContext(ResourcesContext);

  const [searchTextQueryValue, setSearchTextQueryValue] = searchTextQuery;
  const [searchDropdownQueryValue,setSearchDropdownQueryValue] = searchDropdownQuery;
  const [showFavoritesValue, setShowFavoritesValue] = showFavorites;
  const [favoriteResourcesIdValue,setFavoriteResourcesIdValue,] = favoriteResourcesId;
  const [listedResourcesValue] = listedResources;

  const resourceCategories = () => {
    const allCategories = resources.map((resource) => resource.category);
    return ['All Categories', ...new Set(allCategories)];
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    setSearchTextQueryValue(e.target.value);
  };

  const handleDropdownChange = (e) => {
    e.preventDefault();
    setSearchDropdownQueryValue(e.target.value);
  };

  const handleFavoriteChange = (e) => {
    const resource = resources.filter(
      (resource) => resource.id === e.target.value
    );
    if (e.target.checked) {
      //if resource is not already a favorite
      resource[0].isFavorite = true;
      localStorage.setItem(
        'favorites',
        JSON.stringify([e.target.value, ...favoriteResourcesIdValue])
      );
      setFavoriteResourcesIdValue(
        JSON.parse(localStorage.getItem('favorites') || [])
      );
    } else {
      resource[0].isFavorite = false;
      setFavoriteResourcesIdValue(
        localStorage.setItem(
          'favorites',
          JSON.stringify(
            favoriteResourcesIdValue.filter(
              (existingResource) => existingResource !== e.target.value
            )
          )
        )
      );
      setFavoriteResourcesIdValue(
        JSON.parse(localStorage.getItem('favorites') || [])
      );
    }
  };

  const toggleFavorites = (e) => {
    setShowFavoritesValue(e.target.checked);
    starStyle(e.target.checked);
  };

  const starStyle = () => {
    return showFavoritesValue ? { color: 'yellow' } : { color: 'white' };
  };

  const resetTextSearch = () => {
    setSearchTextQueryValue('');
  };
  return (
    <div className='search-page'>
      <h1 className='title'>Find Design Resources</h1>
      <h2 className='sub-title'>Search like there is no tomorrow 🧐</h2>

      <div className='inputs'>
        <div className='text-input'>
          <input
            className='text-input-input'
            placeholder='Search...'
            onChange={(e) => handleTextChange(e)}
            value={searchTextQueryValue}
          ></input>
          <Search className='search-icon' style={{ fontSize: 30 }} />
          <Cancel
            style={{ fontSize: 30 }}
            className='text-input-cancel'
            onClick={() => resetTextSearch()}
          />
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
          <ArrowDropDown className='arrow-dropdown' style={{ fontSize: 50 }} />
        </div>
        <label className='showFavoritesLabel'>
          Show Favorites
          <input
            checked={showFavoritesValue}
            type='checkbox'
            style={{ display: 'none' }}
            className='checkbox'
            onChange={toggleFavorites}
          />
          <Star className='star-icon' style={starStyle()} />
        </label>
      </div>
      <div>
        {listedResourcesValue.map((resource) => (
          <div className='list-item' key={resource.id}>
            <label style={{ margin: 'auto 0' }}>
              <input
                checked={resource.isFavorite ? true : false}
                type='checkbox'
                value={resource.id}
                className='list-item-checkbox'
                onChange={handleFavoriteChange}
              />
              <Star className='list-item-star-icon' />
            </label>

            <a
              className='list-item-info'
              target='_blank'
              rel='noopener noreferrer'
              href={resource.link}
            >
              <p className='list-item-text'>
                <span className='list-item-title'>{resource.title}</span>
                <span> | </span>
                <span className='list-item-desc'>{resource.desc}</span>
              </p>
              <h4 className='list-item-category'>{resource.category}</h4>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesInput;
