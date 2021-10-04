import React from 'react';
import { Button, Form } from 'react-bootstrap';

const CommentForm = (props) => {
  const { commentText, onCommentTextChange, onCommentSubmit } = props;

  return (
    <>
      <Form>
        <Form.Control
          as="textarea"
          rows={3}
          value={commentText}
          onChange={onCommentTextChange}
          placeholder="Your comment here"
        />
        <br />
        <Button bsPrefix="btn-custom" onClick={onCommentSubmit}>
          Comment
        </Button>
      </Form>
    </>
  );
};

export default CommentForm;
