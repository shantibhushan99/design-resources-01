import React, { useContext } from 'react';
import ResourcesListItem from './ResourcesListItem';
import { ResourcesContext } from '../context/ResourcesContext';

const ResourcesList = ({ resources }) => {
  const { listedResources } = useContext(ResourcesContext);
  const [listedResourcesValue] = listedResources;

  if (listedResourcesValue.length === 0) {
    return (
      <h3 className='nothing-found-msg'>
        No resources found
        <span role='img' aria-label='search'>
          😯
        </span>
      </h3>
    );
  } else {
    return (
      <div className='resources-list'>
        {listedResourcesValue.map((resource) => (
          <ResourcesListItem
            key={resource.id}
            resource={resource}
            resources={resources}
          ></ResourcesListItem>
        ))}
      </div>
    );
  }
};

export default ResourcesList;
