import React from 'react';
import { Col, Alert } from 'react-bootstrap';
import ArticleCard from '../ArticleCard';
import PropTypes from 'prop-types';

const Articles = (props) => {
  const { articles, handleButtonClick } = props;

  return (
    <>
      {articles.length > 0
        ? articles.map((article) => (
            <Col md={6} key={article._id}>
              <ArticleCard
                id={article._id}
                title={article.title}
                subtitle={article.subtitle}
                content={article.content}
                createdOn={article.createdOn}
                handleButtonClick={handleButtonClick}
              ></ArticleCard>
            </Col>
          ))
        : null}

      {articles.length === 0 ? (
        <Alert variant={'info'}>No Articles Found</Alert>
      ) : null}
    </>
  );
};

export default Articles;

Articles.propTypes = {
  articles: PropTypes.array.isRequired,
  handleButtonClick: PropTypes.func.isRequired
};
