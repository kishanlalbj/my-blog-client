import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getArticleById, postComment } from '../../actions';
import { Spinner } from 'react-bootstrap';
import moment from 'moment';
import './styles.css';
import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';

const Article = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const article = useSelector((state) => state.articles.article) || {
    comments: []
  };
  const loading = useSelector((state) => state.articles.loading);
  const error = useSelector((state) => state.articles.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    dispatch(getArticleById(params.id));
  }, [params, dispatch]);

  useEffect(() => {
    if (
      article &&
      Array.isArray(article.comments) &&
      article.comments.length > 0
    ) {
      setComments([...article.comments].reverse());
    }
  }, [article]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    console.log('submit');
    console.log(article._id);
    dispatch(
      postComment(article._id, {
        userId: user.id,
        name: user.name,
        comment: commentText
      })
    );
  };

  return (
    <div className="article-container">
      <div className="loading-container">
        {loading && <Spinner animation="border"></Spinner>}
        {!loading && error && <p>{error}</p>}
      </div>
      <br></br>
      <div className="article">
        <h1>{article.title}</h1>
        <h6>{article.subtitle}</h6>
        <span>{moment(article.createdOn).format('ll')}</span>
        <br />
        <br />
        <div dangerouslySetInnerHTML={{ __html: article.content }}></div>

        <hr></hr>
      </div>

      {isAuthenticated && (
        <CommentForm
          commentText={commentText}
          onCommentTextChange={handleCommentTextChange}
          onCommentSubmit={handleCommentSubmit}
        />
      )}

      <CommentList comments={comments}></CommentList>
    </div>
  );
};

export default Article;
