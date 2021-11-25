import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = (props) => (
    <ContentLoader
        speed={1}
        width={'100%'}
        height={'auto'}
        viewBox="0 0 1600 1200"
        backgroundColor="#d1d1d1"
        foregroundColor="#ecebeb"
        {...props}
    >
      <rect x="3%" y="15" rx="0" ry="0" width="120" height="16"/>
      <rect x="3%" y="37" rx="0" ry="0" width="45" height="42"/>
      <rect x="15%" y="37" rx="0" ry="0" width="130" height="19"/>
      <rect x="15%" y="61" rx="0" ry="0" width="150" height="17"/>
      <rect x="90%" y="37" rx="0" ry="0" width="35" height="43"/>
      <rect x="3%" y="95" rx="0" ry="0" width="45" height="42"/>
      <rect x="15%" y="95" rx="0" ry="0" width="122" height="19"/>
      <rect x="15%" y="120" rx="0" ry="0" width="151" height="17"/>
      <rect x="90%" y="95" rx="0" ry="0" width="35" height="43"/>
    </ContentLoader>
);

export default Loader;
