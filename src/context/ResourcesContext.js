import React, { useState, createContext, useEffect } from 'react';

export const ResourcesContext = createContext();

export const ResourcesProvider = (props) => {
  const resources = props.resources;
  const [searchTextQuery, setSearchTextQuery] = useState('');
  const [searchDropdownQuery, setSearchDropdownQuery] = useState(
    'All Categories'
  );
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteResourcesId, setFavoriteResourcesId] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [listedResources, setListedResources] = useState(resources);

  useEffect(() => {
    if (showFavorites && favoriteResourcesId.length === 0) {
      alert('You Have No Favorites Saved');
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

  return (
    <ResourcesContext.Provider
      value={{
        searchTextQuery: [searchTextQuery, setSearchTextQuery],
        searchDropdownQuery: [searchDropdownQuery, setSearchDropdownQuery],
        showFavorites: [showFavorites, setShowFavorites],
        favoriteResourcesId: [favoriteResourcesId, setFavoriteResourcesId],
        listedResources: [listedResources, setListedResources],
      }}
    >
      {props.children}
    </ResourcesContext.Provider>
  );
};
