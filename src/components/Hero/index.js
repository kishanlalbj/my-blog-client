import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';
import './styles.css';

const Hero = (props) => {
  const { searchQuery, handleSearch, handleSearchQueryChange } = props;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="hero" aria-label="hero">
      <div className="hero-content">
        <p className="hero-text">My Personal Blog</p>

        <FormControl
          type="search"
          placeholder="Search"
          className="mr-4"
          aria-label="Search"
          onChange={(e) => handleSearchQueryChange(e.target.value)}
          onKeyPress={handleKeyPress}
          value={searchQuery}
        />
      </div>
    </div>
  );
};

export default Hero;
