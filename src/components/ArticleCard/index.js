import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import './styles.css';

const ArticleCard = (props) => {
  const { id, title, subtitle, content, createdOn, handleButtonClick } = props;

  const handleClick = (e) => {
    e.preventDefault();

    handleButtonClick(id);
  };

  return (
    <Card
      style={{
        width: '100%',
        marginBottom: '20px',
        minHeight: '200px',
        cursor: 'pointer'
      }}
      onClick={handleClick}
    >
      <div className="color-bar"></div>

      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>{subtitle}</Card.Subtitle>
        <span className="date">{moment(createdOn).format('ll')}</span>
        <br />
        <br />
        <Card.Text
          dangerouslySetInnerHTML={{
            __html:
              content.length > 120 ? `${content.substr(0, 120)}...` : content
          }}
        ></Card.Text>
      </Card.Body>
    </Card>
  );
};

ArticleCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired
};

export default ArticleCard;
