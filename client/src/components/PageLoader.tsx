import React from 'react';
import './PageLoader.css';
import logo from '../assets/image.png';

const PageLoader: React.FC = () => {
  return (
    <div className="page-loader-container">
      <div className="page-loader-wrapper">
        <div className="page-loader-ring"></div>
        <img src={logo} alt="Loading..." className="page-loader-logo" />
      </div>
    </div>
  );
};

export default PageLoader;