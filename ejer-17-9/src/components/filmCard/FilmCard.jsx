import { Card, Col } from "react-bootstrap";

const FilmCard = ({ film }) => {
  return (
    <Col md={4} className="mb-4">
      <Card style={{ height: "100%" }}>
        <Card.Img variant="top " src={film.image} />
        <Card.Body>
          <Card.Title>{film.title}</Card.Title>
          <Card.Text>
            <strong>Año:</strong> {film.release_date}
          </Card.Text>
          <Card.Text>
            <strong>Director:</strong> {film.director}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default FilmCard;
