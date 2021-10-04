import { useEffect, useState } from 'react';
import {
  Col,
  Container,
  Row,
  Spinner,
  Button,
  FormLabel,
  FormGroup
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getAllArticles } from '../../actions';
import { useHistory, useLocation } from 'react-router';
import './styles.css';
import Articles from '../../components/Articles';
import Hero from '../../components/Hero';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const articles = useSelector((state) => state.articles.articles);
  const loading = useSelector((state) => state.articles.loading);
  const error = useSelector((state) => state.articles.error);
  const next = useSelector((state) => state.articles.next);
  const previous = useSelector((state) => state.articles.previous);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    if (articles.length === 0) {
      dispatch(getAllArticles(page, limit, searchQuery));
    }
  }, []);

  useEffect(() => {
    const urlQueryParams = new URLSearchParams(location.search);
    urlQueryParams.set('page', page);
    urlQueryParams.set('limit', limit);

    history.push(`${location.pathname}?${urlQueryParams.toString()}`);

    dispatch(getAllArticles(page, limit, searchQuery));
  }, [page, limit]);

  const handleArticleClick = (id) => {
    history.push('/article/' + id);
  };

  const handleSearch = (searchQuery) => {
    const urlQueryParams = new URLSearchParams(history.location.search);
    searchQuery
      ? urlQueryParams.set('search', searchQuery)
      : urlQueryParams.delete('search');
    history.push(`${history.location.pathname}?${urlQueryParams.toString()}`);
    dispatch(getAllArticles(1, limit, searchQuery));
  };

  const handlePrevious = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <div
      style={{
        minHeight: '100%',
        paddingBottom: '40px'
      }}
    >
      <Hero
        searchQuery={searchQuery}
        handleSearchQueryChange={setSearchQuery}
        handleSearch={handleSearch}
      ></Hero>

      <Container>
        <div className="articles">
          <Row>
            <Col md={4} style={{ visibility: 'hidden' }}></Col>
            <Col md={{ span: 2, offset: 6 }}>
              <FormGroup>
                <select
                  aria-label="Default select example"
                  onChange={(e) => setLimit(e.target.value)}
                  defaultValue={limit}
                  style={{ marginBottom: '20px' }}
                >
                  <option value={6}>6</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
                &nbsp;
                <FormLabel>per page</FormLabel>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Row>
                <Articles
                  articles={articles}
                  handleButtonClick={handleArticleClick}
                ></Articles>
              </Row>

              <div className="loading-container">
                {loading && <Spinner animation="border"></Spinner>}
                {error && !loading && <p>{error}</p>}
              </div>
            </Col>
          </Row>
        </div>

        <div className="navigation">
          <Button
            bsPrefix="btn-custom"
            style={{ visibility: previous ? 'visible' : 'hidden' }}
            onClick={handlePrevious}
          >
            Previous
          </Button>

          <Button
            bsPrefix="btn-custom"
            style={{ visibility: next ? 'visible' : 'hidden' }}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Home;
