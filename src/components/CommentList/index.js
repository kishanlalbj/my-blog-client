import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const CommentList = (props) => {
  const { comments = [] } = props;
  return (
    <>
      {comments && comments.length === 0 && <p>No comments yet</p>}

      <Row dir="column" className="justify-content-md-start">
        {comments.reverse().map((comment) => (
          <Col md={8} key={comment._id} style={{ margin: '20px 0px' }}>
            <>
              <Card.Text>
                <b> {comment.name} </b> <br /> {comment.comment}
              </Card.Text>
            </>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CommentList;
