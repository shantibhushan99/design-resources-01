import React, { Fragment, useContext } from 'react';
import ResourcesListItem from './ResourcesListItem';
import { ResourcesContext } from '../context/ResourcesContext';

const ResourcesList = ({ resources }) => {
  const { listedResources } = useContext(ResourcesContext);
  const [listedResourcesValue] = listedResources;

  if (listedResourcesValue.length === 0) {
    return <div className='nothing-found-msg'>hiiiiiiiiiiiiiiiii</div>;
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
