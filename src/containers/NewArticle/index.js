import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { saveNewArticle } from '../../actions';
import Editor from '../../components/Editor';

const NewArticle = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.articles.loading);
  const error = useSelector((state) => state.articles.error);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');

  const validate = () => {
    if (title && subtitle && content) return true;
    else return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      dispatch(saveNewArticle({ title, subtitle, content }));

      if (!error && !loading) history.push('/');
    } else {
      alert('All Fields Required');
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        style={{
          marginTop: '20px',
          height: '100vh'
        }}
      >
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Article Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                type="text"
                placeholder="Article Subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col md={12}>
            <Editor content={content} handleOnChange={setContent} />
          </Col>

          <Col md={12} className="justify-content-end">
            <Button type="submit" variant="primary" disabled={loading}>
              Publish
            </Button>
          </Col>
        </Row>
      </Form>
      <div>{!loading && error && <p>{error}</p>}</div>
    </>
  );
};

export default NewArticle;
