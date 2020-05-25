import React, { useContext } from 'react';
import { ResourcesContext } from '../context/ResourcesContext';
import { Star } from '@material-ui/icons';

const ResourcesListItem = ({ resource, resources }) => {
  const { favoriteResourcesId } = useContext(ResourcesContext);
  const [
    favoriteResourcesIdValue,
    setFavoriteResourcesIdValue,
  ] = favoriteResourcesId;
  const handleFavoriteChange = (e) => {
    const resource = resources.filter(
      (resource) => resource.id === e.target.value
    );
    if (e.target.checked) {
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

  return (
    <div className='list-item'>
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
        <div className='list-item-text'>
          <span className='list-item-title'>{resource.title}</span>
          <span className='list-item-desc'>{resource.desc}</span>
        </div>
        <h4 className='list-item-category'>{resource.category}</h4>
      </a>
    </div>
  );
};

export default ResourcesListItem;
