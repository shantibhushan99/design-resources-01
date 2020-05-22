import React, { useState, useEffect } from 'react';

const PopularMoviePage = ({ resources }) => {
  const [searchTextQuery, setSearchTextQuery] = useState('');
  const [searchDropdownQuery, setSearchDropdownQuery] = useState(
    'All Categories'
  );
  const [listedResources, setListedResources] = useState(resources);

  const resourceCategories = () => {
    const allCategories = resources.map((resource) => resource.category);
    return ['All Categories', ...new Set(allCategories)];
  };

  useEffect(() => {
    //step one, filter the ones from dropdown
    const selectedDropDownResources = () => {
      if (searchDropdownQuery === 'All Categories') {
        return resources;
      } else {
        return resources.filter(
          (resource) => resource.category === searchDropdownQuery
        );
      }
    };
    //step two, filter the ones from text input
    const resultsTextInput = selectedDropDownResources().filter((resource) =>
      resource.title.toLowerCase().includes(searchTextQuery.toLowerCase())
    );
    setListedResources(resultsTextInput);
  }, [searchDropdownQuery, searchTextQuery]);

  const handleTextChange = (e) => {
    e.preventDefault();
    setSearchTextQuery(e.target.value);
  };

  const handleDropdownChange = (e) => {
    e.preventDefault();
    setSearchDropdownQuery(e.target.value);
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
          <span className='text-input-cancel' onClick={() => resetTextSearch()}>
            x
          </span>
        </div>
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
      </div>
      <div>
        {listedResources.map((resource) => (
          <a
            className='list-item'
            key={resource.id}
            target='_blank'
            href={resource.link}
          >
            <p className='list-item-text'>
              <span className='list-item-title'>{resource.title}</span>
              <span> | </span>
              <span className='list-item-desc'>{resource.desc}</span>
            </p>
            <h4 className='list-item-category'>{resource.category}</h4>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PopularMoviePage;
