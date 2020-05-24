import React, { useState, useEffect } from 'react';
import { Star, Search, Cancel, ArrowDropDown } from '@material-ui/icons';

const Resources = ({ resources }) => {
  const [searchTextQuery, setSearchTextQuery] = useState('');
  const [searchDropdownQuery, setSearchDropdownQuery] = useState(
    'All Categories'
  );
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteResourcesId, setFavoriteResourcesId] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [listedResources, setListedResources] = useState(resources);

  const resourceCategories = () => {
    const allCategories = resources.map((resource) => resource.category);
    return ['All Categories', ...new Set(allCategories)];
  };

  useEffect(() => {
    if (showFavorites && favoriteResourcesId.length === 0) {
      alert('You have no Favorites yet');
      setShowFavorites(false);
    } else {
      //step one, filter the ones from favorites
      const selectedFavoriteResources = () => {
        if (favoriteResourcesId.length > 0 && showFavorites) {
          const favoriteResources = [];
          favoriteResourcesId.forEach((favoriteResource) =>
            resources.forEach((resource) => {
              if (favoriteResource === resource.id) {
                favoriteResources.push(resource);
              }
            })
          );
          return favoriteResources;
        } else {
          return resources;
        }
      };

      //step two, filter the ones from dropdown
      const selectedDropDownResources = () => {
        if (searchDropdownQuery === 'All Categories') {
          return selectedFavoriteResources();
        } else {
          return selectedFavoriteResources().filter(
            (resource) => resource.category === searchDropdownQuery
          );
        }
      };

      //step three, filter the ones from text input
      const resultsTextInput = selectedDropDownResources().filter((resource) =>
        resource.title.toLowerCase().includes(searchTextQuery.toLowerCase())
      );

      setListedResources(resultsTextInput);
    }
    const findFavoritesId = (favoriteResources, resources) => {
      favoriteResources.forEach((favoriteResource) =>
        resources.forEach((resource) => {
          if (favoriteResource === resource.id) {
            resource.isFavorite = true;
          }
        })
      );
    };
    findFavoritesId(favoriteResourcesId, resources);
  }, [
    favoriteResourcesId,
    searchDropdownQuery,
    searchTextQuery,
    showFavorites,
    resources,
  ]);

  const handleTextChange = (e) => {
    e.preventDefault();
    setSearchTextQuery(e.target.value);
  };

  const handleDropdownChange = (e) => {
    e.preventDefault();
    setSearchDropdownQuery(e.target.value);
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
        JSON.stringify([e.target.value, ...favoriteResourcesId])
      );
      setFavoriteResourcesId(
        JSON.parse(localStorage.getItem('favorites') || [])
      );
    } else {
      resource[0].isFavorite = false;
      setFavoriteResourcesId(
        localStorage.setItem(
          'favorites',
          JSON.stringify(
            favoriteResourcesId.filter(
              (existingResource) => existingResource !== e.target.value
            )
          )
        )
      );
      setFavoriteResourcesId(
        JSON.parse(localStorage.getItem('favorites') || [])
      );
    }
  };

  const toggleFavorites = (e) => {
    setShowFavorites(e.target.checked);
    starStyle(e.target.checked);
  };

  const starStyle = () => {
    return showFavorites ? { color: 'yellow' } : { color: 'white' };
  };

  const resetTextSearch = () => {
    setSearchTextQuery('');
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
            value={searchTextQuery}
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
            value={searchDropdownQuery}
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
            checked={showFavorites}
            type='checkbox'
            style={{ display: 'none' }}
            className='checkbox'
            onChange={toggleFavorites}
          />
          <Star className='star-icon' style={starStyle()} />
        </label>
      </div>
      <div>
        {listedResources.map((resource) => (
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

export default Resources;
